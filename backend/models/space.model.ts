import mongoose from "mongoose";

const openSpaceSchema = new mongoose.Schema({
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
  meetingRoom: {
    type: Number,
    required: true,
  },
  callRoom: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// faire un prototype, avec les fonctionnalités : (onglets comment s'est arrangé, menus sous menus etc )

export default mongoose.model("Space", openSpaceSchema);
