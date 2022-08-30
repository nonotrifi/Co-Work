import mongoose from "mongoose";
import Subscription from "../enums/subscription";

const subscriptionSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  subscription: {
    type: String,
    enum: Object.values(Subscription),
    default: Subscription.NORMALMONTHLY,
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Subscription", subscriptionSchema);
