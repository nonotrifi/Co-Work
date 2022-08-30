import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Space",
    required: true,
  },
});

export default mongoose.model("Material", materialSchema);
