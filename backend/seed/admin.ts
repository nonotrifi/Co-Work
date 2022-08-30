import mongoose from "mongoose";
import User from "../models/user.model";
import userService from "../services/user.service";
import Role from "../enums/role.enum";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL!;

mongoose.connect(MONGO_URL, {}).then(() => {
  (async () => {
    try {
      const user = await User.findOne({ email: "admin@admin.com" });
      if (!user) {
        const newUser = new User({
          firstName: "Admin",
          lastName: "Admin",
          userName: "admin",
          email: "admin@admin.com",
          password: userService.hashPassword("admin"),
          role: Role.ADMIN,
        });
        await newUser.save();
        console.log("admin created");
      }else{
        console.log("admin already exists");
      }
      mongoose.disconnect();
    } catch (err) {
      console.log(err);
    }
  })();
});
