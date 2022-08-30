import Stripe from "stripe";

class StripeHelper {
  public stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2022-08-01",
      typescript: true,
    });
  }
}

export default StripeHelper;
