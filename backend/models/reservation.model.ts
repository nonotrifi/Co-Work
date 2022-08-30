import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    spaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    endDate: {
      type: Date,
      required: true,
    },
    meetingRoom: {
      type: Number,
      required: true,
      default: 0,
    },
    callRoom: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// faire un prototype, avec les fonctionnalités : (onglets comment s'est arrangé, menus sous menus etc )

export default mongoose.model("Reservation", reservationSchema);
