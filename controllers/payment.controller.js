import stripe from "../config/stripe.js";
import paypal from "@paypal/checkout-server-sdk";
import paypalClient from "../config/paypal.js";
import { PrismaClient } from "@prisma/client";
import {
  addMoneyEmailHTML,
  cashOutRequestEmailHTML,
  informationPurchaseEmailHTML,
  someonePurchasedEmailHTML,
  subscriptionCancelEmailHTML,
  subscriptionPurchaseEmailHTML,
} from "../utils/emailTemplate.js";
import { sendEmail } from "../utils/email.js";

const prisma = new PrismaClient();

// Controller function to register a user's payment method
export const registerPaymentMethod = async (req, res) => {
  const { paymentMethodId } = req.body;
  const user = req.user;

  try {
    // Create a Customer object for the user with the payment method linked to it
    const customer = await stripe.customers.create({
      metadata: { userId: user.id }, // Store the userId in the customer metadata
      payment_method: paymentMethodId,
    });

    // Optionally, set the new customer's payment method as the default
    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Now retrieve the payment method details
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    // Update user record in the database with the payment method ID
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        paymentMethodId,
      },
    });

    res.status(201).send({
      success: true,
      customer,
      paymentMethodInfo: {
        brand: paymentMethod.card.brand,
        last4: paymentMethod.card.last4,
        exp_month: paymentMethod.card.exp_month,
        exp_year: paymentMethod.card.exp_year,
      },
      updatedUser: {
        id: updatedUser.id,
        paymentMethodId: updatedUser.paymentMethodId,
      },
    });
  } catch (error) {
    console.error("Error registering payment method:", error);
    res.status(500).send({ error: error.message });
  }
};

export const chargeUserBalance = async (req, res) => {
  const amount = Number(req.body.amount);
  const { description } = req.body;

  // Validate input
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const customers = await stripe.customers.list({ limit: 1000 });
    const customer = customers.data.find((c) => {
      return Number(c.metadata.userId) === user.id;
    });

    // console.log("customers =>", customers);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Create a PaymentIntent using the customer's default payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in cents
      currency: "usd",
      customer: customer.id,
      payment_method: user.paymentMethodId,
      confirm: true, // Automatically confirm the payment
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
      metadata: {
        description: description, // Add description here
      },
    });

    // Save transaction to your database
    await prisma.userTransactions.create({
      data: {
        userId: user.id,
        paymentIntentId: paymentIntent.id,
        paymentMethod: "Stripe",
        amount: paymentIntent.amount,
        description: paymentIntent.metadata.description,
        status: paymentIntent.status, // e.g., 'succeeded'
      },
    });

    // Handle failure in payment intent
    if (paymentIntent.status !== "succeeded") {
      return res.status(500).json({ error: "Payment failed" });
    }

    // Decrease the user's balance
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { balance: user.balance + amount },
    });

    await sendEmail({
      email: updatedUser.personalEmail ? updatedUser.personalEmail : updatedUser.email,
      subject: `Add Money Confirmation`,
      html: addMoneyEmailHTML(amount),
    });

    return res.status(200).json({
      newBalance: updatedUser.balance,
      message: "Balance updated successfully.",
    });
  } catch (error) {
    console.log("error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const purchaseProducts = async (req, res) => {
  const amount = Number(req.body.amount);
  const { description } = req.body;

  // Validate input
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const amountToReduce = user.balance < amount ? user.balance : amount;
    const amountToMakeExtraPayment =
      user.balance < amount ? amount - user.balance : 0;

    // Decrease the user's balance
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { balance: user.balance - amountToReduce },
    });

    // Save transaction to your database
    await prisma.userTransactions.create({
      data: {
        userId: user.id,
        paymentIntentId: `pi_b_${Date.now()}_${user.id}`,
        amount: Math.round(amountToReduce * 100),
        paymentMethod: "Balance",
        description,
        status: "succeeded", // e.g., 'succeeded'
      },
    });

    // If there's extra payment needed, create a PaymentIntent
    if (amountToMakeExtraPayment > 0) {
      const customers = await stripe.customers.list({ limit: 1000 });
      const customer = customers.data.find(
        (c) => Number(c.metadata.userId) === user.id
      );

      if (!customer) {
        return res.status(404).json({ error: "You must add a payment method before checking out." });
      }

      // Create a PaymentIntent using the customer's default payment method
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amountToMakeExtraPayment * 100), // Amount in cents
        currency: "usd",
        customer: customer.id,
        payment_method: user.paymentMethodId,
        confirm: true, // Automatically confirm the payment
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "never",
        },
        metadata: {
          description: description, // Add description here
        },
      });

      // Save transaction to your database
      await prisma.userTransactions.create({
        data: {
          userId: user.id,
          paymentIntentId: paymentIntent.id,
          paymentMethod: "Stripe",
          amount: paymentIntent.amount,
          description: paymentIntent.metadata.description,
          status: paymentIntent.status, // e.g., 'succeeded'
        },
      });
    }

    return res.status(200).json({
      newBalance: updatedUser.balance,
      message: "Balance updated successfully.",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const shareRevenue = async (req, res) => {
  const amount = Number(req.body.amount);
  const revenueId = Number(req.body.revenueId);
  const { description1, description2, informationItems, purchasedQuestions, revenueQuestions } =
    req.body;

  // Validate input
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const revenueUser = await prisma.user.findUnique({
      where: { id: revenueId },
    });

    if (!revenueUser) {
      return res.status(404).json({ error: "Revenue User not found" });
    }

    const amountToReduce = user.balance < amount ? user.balance : amount;
    const amountToMakeExtraPayment =
      user.balance < amount ? amount - user.balance : 0;

    // Decrease the user's balance
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { balance: user.balance - amountToReduce },
    });

    // Decrease the revenue user's balance
    await prisma.user.update({
      where: { id: revenueUser.id },
      data: { balance: revenueUser.balance + amount / 2 },
    });

    if (amountToReduce > 0) {
      // Save transaction to your database
      await prisma.userTransactions.create({
        data: {
          userId: user.id,
          revenueId: revenueId,
          paymentIntentId: `pi_b_${Date.now()}_${user.id}`,
          paymentMethod: "Balance",
          amount: Math.round(amountToReduce * 100),
          description: description1,
          informationItems: informationItems,
          status: "succeeded", // e.g., 'succeeded'
        },
      });
    }

    // Save transaction to your database
    await prisma.userTransactions.create({
      data: {
        userId: revenueUser.id,
        paymentIntentId: `pi_b_${Date.now()}_${revenueUser.id}`,
        paymentMethod: "Balance",
        amount: Math.round((amount / 2) * 100),
        description: description2,
        status: "succeeded", // e.g., 'succeeded'
      },
    });

    // If there's extra payment needed, create a PaymentIntent
    if (amountToMakeExtraPayment > 0) {
      const customers = await stripe.customers.list({ limit: 1000 });
      const customer = customers.data.find(
        (c) => Number(c.metadata.userId) === user.id
      );

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      // Create a PaymentIntent using the customer's default payment method
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amountToMakeExtraPayment * 100), // Amount in cents
        currency: "usd",
        customer: customer.id,
        payment_method: user.paymentMethodId,
        confirm: true, // Automatically confirm the payment
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "never",
        },
        metadata: {
          description: description1, // Add description here
        },
      });

      // Save transaction to your database
      await prisma.userTransactions.create({
        data: {
          userId: user.id,
          revenueId: revenueId,
          paymentIntentId: paymentIntent.id,
          paymentMethod: "Stripe",
          amount: paymentIntent.amount,
          description: paymentIntent.metadata.description,
          informationItems: informationItems,
          status: paymentIntent.status, // e.g., 'succeeded'
        },
      });
    }

    const today = new Date();
    const age = today.getFullYear() - revenueUser.birthday.getFullYear();

    await sendEmail({
      email: user.personalEmail ? user.personalEmail : user.email,
      subject: `${revenueUser.firstName} ${revenueUser.lastName}, ${age} Information Purchase`,
      html: informationPurchaseEmailHTML(
        `${matchedUser.firstName} ${matchedUser.lastName}`,
        age,
        purchasedQuestions,
        revenueQuestions
      ),
    });

    await sendEmail({
      email: revenueUser.personalEmail ? revenueUser.personalEmail : revenueUser.email,
      subject: `Information Purchased`,
      html: someonePurchasedEmailHTML(
        `${matchedUser.firstName} ${matchedUser.lastName}`,
        amount
      ),
    });

    return res.status(200).json({
      newBalance: updatedUser.balance,
      message: "Balance updated successfully.",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const purchasePremium = async (req, res) => {
  const { premiumName, description } = req.body;
  const amount = Number(req.body.amount);
  const premiumPeriod = Number(req.body.premiumPeriod);

  // Validate input
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const amountToReduce = user.balance < amount ? user.balance : amount;
    const amountToMakeExtraPayment =
      user.balance < amount ? amount - user.balance : 0;

    // If there's extra payment needed, create a PaymentIntent
    if (amountToMakeExtraPayment > 0) {
      const customers = await stripe.customers.list({ limit: 1000 });
      const customer = customers.data.find(
        (c) => Number(c.metadata.userId) === user.id
      );

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      // Create a PaymentIntent using the customer's default payment method
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amountToMakeExtraPayment * 100), // Amount in cents
        currency: "usd",
        customer: customer.id,
        payment_method: user.paymentMethodId,
        confirm: true, // Automatically confirm the payment
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "never",
        },
        metadata: {
          description, // Add description here
        },
      });

      // Save transaction to your database
      await prisma.userTransactions.create({
        data: {
          userId: user.id,
          paymentIntentId: paymentIntent.id,
          paymentMethod: "Stripe",
          amount: paymentIntent.amount,
          description: paymentIntent.metadata.description,
          status: paymentIntent.status, // e.g., 'succeeded'
        },
      });
    }

    const premiumEndDate = new Date(); // Get the current date
    premiumEndDate.setMonth(premiumEndDate.getMonth() + premiumPeriod);

    // Decrease the user's balance
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        balance: user.balance - amountToReduce,
        premiumName: `${premiumName}`,
        premiumEndsAt: premiumEndDate,
      },
    });

    // Save transaction to your database
    await prisma.userTransactions.create({
      data: {
        userId: user.id,
        paymentIntentId: `pi_b_${Date.now()}_${user.id}`,
        paymentMethod: "Stripe",
        amount: Math.round(amountToReduce * 100),
        description,
        status: "succeeded", // e.g., 'succeeded'
      },
    });

    const startDate = new Date();
    const formattedStartDate = `${(startDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${startDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${startDate.getFullYear()}`;

    const endDate = premiumEndDate;
    const formattedEndDate = `${(endDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${endDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${endDate.getFullYear()}`;

    await sendEmail({
      email: user.personalEmail ? user.personalEmail : user.email,
      subject: `Premium Subscription`,
      html: subscriptionPurchaseEmailHTML(
        premiumPeriod,
        amount,
        formattedStartDate,
        formattedEndDate
      ),
    });

    return res.status(200).json({
      updatedUser: {
        id: updatedUser.id,
        balance: updatedUser.balance,
        premiumName: updatedUser.premiumName,
        premiumEndsAt: updatedUser.premiumEndsAt,
      },
      message: "Premium purchased successfully.",
    });
  } catch (error) {
    console.log("error: ", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const cancelPremium = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        premiumName: null,
        premiumEndsAt: null,
      },
    });

    await sendEmail({
      email: user.personalEmail ? user.personalEmail : user.email,
      subject: `Subscription Cancellation`,
      html: subscriptionCancelEmailHTML(),
    });

    return res.status(200).json({
      updatedUser: {
        id: updatedUser.id,
        balance: updatedUser.balance,
        premiumName: updatedUser.premiumName,
        premiumEndsAt: updatedUser.premiumEndsAt,
      },
      message: "Premium canceled.",
    });
  } catch (error) {
    console.log("error: ", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getTransactionHistory = async (req, res) => {
  try {
    // Fetch transaction history from the database
    const transactions = await prisma.userTransactions.findMany({
      orderBy: { createdAt: "desc" }, // Order by newest first
      take: 100, // Limit the number of records
    });

    const userIds = transactions.map((transaction) => transaction.userId);

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds, // Only fetch users with IDs present in withdraw requests
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    // Create a mapping of userId to userName for easy lookup
    const userNameMap = {};
    users.forEach((user) => {
      userNameMap[user.id] = `${user.firstName} ${user.lastName}`;
    });

    // Map through requests and add userName to each request
    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction,
      user: userNameMap[transaction.userId] || "Unknown User", // Fallback if user is not found
    }));

    return res.status(200).json({
      success: true,
      transactions: formattedTransactions,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTransactionHistoryByUserId = async (req, res) => {
  const userId = Number(req.params.userId); // Assuming you have user data from authentication

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch transaction history from the database
    const transactions = await prisma.userTransactions.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" }, // Order by newest first
      take: 100, // Limit the number of records
    });

    // Map through requests and add userName to each request
    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction,
      user: user.firstName + " " + user.lastName, // Fallback if user is not found
    }));

    return res.status(200).json({
      success: true,
      transactions: formattedTransactions,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRevenue = async (req, res) => {
  try {
    // Fetch transaction history from the database
    const transactions = await prisma.userTransactions.findMany({
      where: {
        description: {
          not: "Reload balance",
        },
      },
      orderBy: { createdAt: "desc" }, // Order by newest first
      take: 100, // Limit the number of records,
      select: {
        amount: true,
        createdAt: true,
        description: true,
      },
    });

    // Map through requests and add userName to each request
    const formattedTransactions = transactions.map((transaction) => ({
      ...transaction,
      amount:
        transaction.description === "Information revenue share"
          ? transaction.amount / 2
          : transaction.amount,
    }));

    return res.status(200).json({
      success: true,
      transactions: formattedTransactions,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getRevenueById = async (req, res) => {
  const userId = req.user.id; // Get the userId from the authenticated user
  const { revenueId } = req.params; // Get the revenueId from the request parameters

  try {
    // Fetch transaction history from the database
    const transactions = await prisma.userTransactions.findMany({
      where: {
        userId: userId, // Filter by userId
        revenueId: Number(revenueId), // Filter by revenueId, ensure it's a number
        description: {
          contains: "Information purchase", // Check if description includes "Information purchase"
        },
      },
      orderBy: { createdAt: "desc" }, // Order by newest first
      take: 100, // Limit the number of records
    });

    return res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const withdrawFunds = async (req, res) => {
  const amount = Number(req.body.amount); // Amount to withdraw (in cents)
  const { description } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!amount || amount <= 0 || amount > Math.round(user.balance * 100)) {
      return res.status(400).json({ error: "Invalid withdrawal amount" });
    }

    // Create a payout using Stripe
    const payout = await stripe.payouts.create({
      amount: amount,
      currency: "usd",
      metadata: {
        userId: user.id,
        description,
      },
    });

    // Save transaction to your database
    await prisma.userTransactions.create({
      data: {
        userId: user.id,
        paymentIntentId: payout.id,
        amount: payout.amount,
        description: payout.metadata.description,
        status: payout.status, // e.g., 'succeeded'
      },
    });

    return res.status(200).json({
      success: true,
      payout,
    });
  } catch (error) {
    console.error("Error processing withdrawal:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Withdrawal controller
export const withdrawUserBalanceToPayPal = async (req, res) => {
  const { amount, paypalEmail } = req.body; // Expecting userId, amount, and PayPal email
  const userId = req.user.id;

  try {
    // Validate the request
    if (!userId || !amount || !paypalEmail) {
      return res
        .status(400)
        .json({ error: "User ID, amount, and PayPal email are required." });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance." });
    }

    // Create a payout
    const request = new paypal.payouts.PayoutsPostRequest();
    request.requestBody({
      sender_batch_header: {
        sender_batch_id: Math.random().toString(36).substring(9), // Unique batch ID
        email_subject: "You have a payout!",
      },
      items: [
        {
          recipient_type: "EMAIL",
          amount: {
            value: amount.toFixed(2), // Amount in string format
            currency: "USD", // Use appropriate currency
          },
          receiver: paypalEmail, // User's PayPal email
          note: `Withdrawal for user ${userId}`,
          sender_item_id: "item_1", // Item ID for reference
        },
      ],
    });

    const response = await client.execute(request);

    if (response.statusCode === 201) {
      // Update user's balance in your database
      await prisma.user.update({
        where: { id: userId },
        data: { balance: user.balance - amount },
      });

      // Create a transaction record
      await prisma.userTransactions.create({
        data: {
          userId: userId,
          paymentIntentId: response.result.batch_header.payout_batch_id, // Assuming this is the ID you want to store
          amount: amount * 100, // Store amount in cents
          description: `Withdrawal to PayPal: ${paypalEmail}`,
          status: "COMPLETED", // Set status as completed
        },
      });

      // Send a success response
      res.status(200).json({ success: true, payout: response.result });
    } else {
      res
        .status(500)
        .json({ error: "Failed to create payout.", details: response });
    }
  } catch (error) {
    console.error("Error during withdrawal:", error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new withdraw request
export const createWithdrawRequest = async (req, res) => {
  const {
    paypalEmail,
    venmoUsername,
    cashAppUsername,
    amount,
    address,
    city,
    state,
    zipCode,
    status,
  } = req.body;
  const userId = req.user.id;

  try {
    const newRequest = await prisma.userWithdrawRequests.create({
      data: {
        userId,
        paypalEmail,
        venmoUsername,
        cashAppUsername,
        amount: Number(amount),
        address,
        city,
        state,
        zipCode: Number(zipCode),
        status,
      },
    });

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    await sendEmail({
      email: existingUser.personalEmail ? existingUser.personalEmail : existingUser.email,
      subject: `Cash Out Request`,
      html: cashOutRequestEmailHTML(
        paypalEmail,
        venmoUsername,
        cashAppUsername,
        address,
        city,
        state,
        zipCode,
        amount
      ),
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get all withdraw requests
export const getAllWithdrawRequests = async (req, res) => {
  try {
    const requests = await prisma.userWithdrawRequests.findMany();

    // Collect userIds from requests to get user names in a single query
    const userIds = requests.map((request) => request.userId);

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds, // Only fetch users with IDs present in withdraw requests
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    // Create a mapping of userId to userName for easy lookup
    const userNameMap = {};
    users.forEach((user) => {
      userNameMap[user.id] = `${user.firstName} ${user.lastName}`;
    });

    // Map through requests and add userName to each request
    const formattedRequests = requests.map((request) => ({
      ...request,
      userName: userNameMap[request.userId] || "Unknown User", // Fallback if user is not found
    }));

    res.status(200).json(formattedRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single withdraw request by ID
export const getWithdrawRequestById = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await prisma.userWithdrawRequests.findUnique({
      where: { id: Number(id) },
    });
    if (!request) {
      return res.status(404).json({ error: "Withdraw request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single withdraw request by ID
export const getWithdrawRequestsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const request = await prisma.userWithdrawRequests.findMany({
      where: { userId: Number(userId) },
    });
    if (!request) {
      return res.status(404).json({ error: "Withdraw request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a withdraw request by ID
export const updateWithdrawRequest = async (req, res) => {
  const { id } = req.params;
  const {
    paypalEmail,
    venmoUsername,
    cashAppUsername,
    amount,
    address,
    city,
    state,
    zipCode,
    status,
  } = req.body;

  try {
    const updatedRequest = await prisma.userWithdrawRequests.update({
      where: { id: Number(id) },
      data: {
        paypalEmail,
        venmoUsername,
        cashAppUsername,
        amount,
        address,
        city,
        state,
        zipCode,
        status,
      },
    });
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a withdraw request by ID
export const deleteWithdrawRequest = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.userWithdrawRequests.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateWithdrawRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedRequest = await prisma.userWithdrawRequests.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
