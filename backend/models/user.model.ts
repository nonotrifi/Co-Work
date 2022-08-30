// User mongoose model
import mongoose from "mongoose";
import RoleEnum from "../enums/role.enum";
// User.findById / User.delete etc etc
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  email: {
    unique: true,
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  resetToken: {
    type: String,
    required: false,
    minLength: 3,
    maxLength: 255,
  },
  role: {
    type: String,
    enum: Object.values(RoleEnum),
    default: RoleEnum.CLIENT,
    required: true,
  },
  imageUrl: {
    type: String,
  }
});

export default mongoose.model("User", userSchema);
