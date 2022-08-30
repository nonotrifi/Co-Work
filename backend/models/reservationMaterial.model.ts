import mongoose from "mongoose";

const ReservationMaterialSchema = new mongoose.Schema({
  materialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material",
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: false,
  }
});

export default mongoose.model("ReservationMaterial", ReservationMaterialSchema);
