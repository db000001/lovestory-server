import paypal from "@paypal/checkout-server-sdk";

// Initialize PayPal SDK
const environment = new paypal.core.SandboxEnvironment(
  "YOUR_CLIENT_ID",
  "YOUR_SECRET"
); // Use Sandbox for testing
const paypalClient = new paypal.core.PayPalHttpClient(environment);

export default paypalClient;
