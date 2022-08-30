import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  description: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  image: {
    type: String,
  },
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Space",
    required: true,
  },
  reservedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

export default mongoose.model("Event", eventSchema);
