import { Request, Response } from "express";
import SubscriptionEnum from "../enums/subscription";
import Subscription from "../models/subscription.model";
import User from "../models/user.model";
import StripeHelper from "../utils/stripe";

const subscriptionService = {
  calculateEndDate: (subscription: SubscriptionEnum) => {
    const date = new Date();
    switch (subscription) {
      case SubscriptionEnum.NORMALMONTHLY:
        date.setMonth(date.getMonth() + 1);
        break;
      case SubscriptionEnum.NORMALANUALLY:
        date.setFullYear(date.getFullYear() + 1);
        break;
      case SubscriptionEnum.PREMIUMMONTHLY:
        date.setMonth(date.getMonth() + 1);
        break;
      case SubscriptionEnum.PREMIUMANUALLY:
        date.setMonth(date.getMonth() + 8);
        break;
      default:
        break;
    }
    return date;
  },
  getSubscriptions: async (res: Response) => {
    try {

      const subscriptions = await Subscription.find();
      return res.json(subscriptions);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  getSubscription: async (req: Request, res: Response) => {
    try {
      const subscription = await Subscription.findById(req.params.id); // https://myapp.fr/products?id=123&color=blue (POST / GET) ==> req.params.id req.params.color
      if (!subscription) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json(subscription);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  },
  getMySubscription: async (req: Request, res: Response) => {
    try {
      console.log("getting my subscription");

      const subscription = await Subscription.findOne({
        clientId: req.user.id,
      }); // https://myapp.fr/products?id=123&color=blue (POST / GET) ==> req.params.id req.params.color
      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }
      return res.json(subscription);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  },
  createSubscription: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const stripe = new StripeHelper().stripe;
      const customer = await stripe.customers.create({
        name: user.firstName + " " + user.lastName,
        payment_method: req.body.payment_method,
        email: user.email,
        // source
      });
      console.log(customer);

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: req.body.lookup_key }],
        expand: ["latest_invoice.payment_intent"],
        default_payment_method: req.body.payment_method,
      });
      const updatedSubscription = await Subscription.findOneAndUpdate(
        { clientId: user._id },
        {
          $set: {
            startDate: new Date(),
            endDate: subscriptionService.calculateEndDate(
              req.body.subscription
            ),
          },
        },
        { new: true }
      );
      res.send(updatedSubscription);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  updateSubscription: async (req: Request, res: Response) => {
    try {
      const subscription = await Subscription.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      return res.status(200).json(subscription); // OK
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  },
  deleteSubscription: async (req: Request, res: Response) => {
    try {
      await Subscription.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Deleted" }); // NO CONTENT
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  },
  payment: async (req: Request, res: Response) => {
    const stripeToken = req.body.token;
    const stripe = new StripeHelper().stripe;
    try {
      const result = await stripe.charges.create({
        amount: req.body.amount,
        currency: "usd",
        source: stripeToken,
        description: "Paiement de la subscription",
      });
      console.log(result);
      res.send(result);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  },
};

export default subscriptionService;
