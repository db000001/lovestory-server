import express from "express";
import {
  chargeUserBalance,
  purchaseProducts,
  getTransactionHistory,
  registerPaymentMethod,
  purchasePremium,
  shareRevenue,
  withdrawFunds,
  createWithdrawRequest,
  getAllWithdrawRequests,
  getWithdrawRequestById,
  updateWithdrawRequest,
  deleteWithdrawRequest,
  updateWithdrawRequestStatus,
  getTransactionHistoryByUserId,
  getWithdrawRequestsByUserId,
  getRevenue,
  getRevenueById,
  cancelPremium,
} from "../controllers/payment.controller.js";
import { requireUserAuth } from "../middleware/authMiddleware.js";

const paymentRouter = express.Router();

paymentRouter.use(requireUserAuth);

// Route to create a payment intent
paymentRouter.post("/register-pm", registerPaymentMethod);
paymentRouter.put("/charge-balance", chargeUserBalance);
paymentRouter.put("/purchase-products", purchaseProducts);
paymentRouter.put("/share-revenue", shareRevenue);
paymentRouter.put("/purchase-premium", purchasePremium);
paymentRouter.put("/cancel-premium", cancelPremium);
paymentRouter.put("/withdraw", withdrawFunds);
paymentRouter.post("/withdraw-requests", createWithdrawRequest);
paymentRouter.get("/withdraw-requests", getAllWithdrawRequests);
paymentRouter.get("/withdraw-requests/:id", getWithdrawRequestById);
paymentRouter.get("/withdraw-requests/user/:userId", getWithdrawRequestsByUserId);
paymentRouter.put("/withdraw-requests/:id", updateWithdrawRequest);
paymentRouter.delete("/withdraw-requests/:id", deleteWithdrawRequest);
paymentRouter.put('/withdraw-requests/:id/status', updateWithdrawRequestStatus);

// Route to fetch user's transaction history
paymentRouter.get("/transactions", getTransactionHistory);
paymentRouter.get("/transactions/:userId", getTransactionHistoryByUserId);
paymentRouter.get("/revenue", getRevenue);
paymentRouter.get("/revenue/:revenueId", getRevenueById);

export default paymentRouter;
