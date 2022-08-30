import bcrypt from "bcrypt";
import User from "../models/user.model";
import { Response, Request } from "express";
import jsonwebtoken from "jsonwebtoken";
import Subscription from "../models/subscription.model";
import subscriptionService from "./subscription.service";
import RoleEnum from "../enums/role.enum";
import SubscriptionEnum, {
  PaymentsArray,
  PaymentType,
} from "../enums/subscription";

import emailService from "./email.service";

import EmailUtil from "../utils/email";
import UserUtils from "../utils/user";
import { CodePipeline } from "aws-sdk";

import S3Util from "../utils/s3";

// 10 la size du hashage

let emailUtil = new EmailUtil();
let userUtils = new UserUtils();

const userService = {
  getAll: async (res: Response) => {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }
  },

  // getOne: async (req: Request, res: Response) => {
  //   try {
  //     const user = await User.findById(req.params.id);
  //     return res.json(user);
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json({ message: "Server error" });
  //   }
  // },

  delete: async (res: Response, req: Request) => {
    try {
      const userId = req.params.id;
      const users = await User.findByIdAndDelete(userId);

      await userUtils.purgeUser(userId);

      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }
  },

  deleteMe: async (res: Response, req: Request) => {
    try {
      console.log("deleteMe user: ", req.user);
      const userId = req.user.id;
      const user = await User.findByIdAndDelete(userId);
      await userUtils.purgeUser(userId);
      return res.json(user);
    } catch (err) {
      console.log("delete me ", err);
      return res.status(500).json({ message: "Server error" });
    }
  },

  signUp: async (req: Request, res: Response) => {
    const { subscription, email, firstName, lastName, password } = req.body;
    try {
      const user = await User.create({
        email,
        firstName,
        lastName,
        role: RoleEnum.CLIENT,
        password: userService.hashPassword(password),
      });

      const today = new Date();

      await Subscription.create({
        clientId: user._id,
        startDate: today,
        // endDate: subscriptionService.calculateEndDate(subscription), // stripe va calculer la date de fin
        endDate: today,
        subscription: subscription,
      });
      const token = jsonwebtoken.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "15h" }
      );

      // call function to send the email confirmation to user
      emailUtil.sendSignupConfirmationEmail(email);
      return res.json(token);
    } catch (err: any) {
      if (err.code === 11000) {
        // Object.keys(err.keyPattern)[0] returns the key of the duplicate field

        return res.status(400).json({
          message: `there already exists a user with the ${
            Object.keys(err.keyValue)[0]
          }: ${err.keyValue[Object.keys(err.keyValue)[0]]}`,
        });
      }
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }
  },

  signIn: async (req: Request, res: Response) => {
    console.log("signing is called from services");
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: "User or password incorrect" });
      }
      const isValid = await userService.comparePassword(
        req.body.password,
        user.password
      );
      if (!isValid) {
        return res.status(401).json({ message: "User or password incorrect" });
      }
      console.log("user signIn: ", user);
      const token = jsonwebtoken.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "15h" }
      );
      return res.json(token);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }
  },

  hasPayment: async (req: Request, res: Response) => {
    const subscription = await Subscription.findOne({
      clientId: req.user.id,
    });
    if (!subscription) {
      return res.send(false);
    }
    if (!subscription.endDate || !subscription.startDate) {
      return res.send(false);
    }
    const startDate = (subscription?.startDate as Date).getTime();
    const endDate = (subscription?.endDate as Date).getTime();
    if (startDate >= endDate) {
      return res.send(false);
    }
    return res.send(true);
  },

  getPaymentType: async (req: Request, res: Response) => {
    const subscription = await Subscription.findOne({
      clientId: req.user.id,
    });
    const payment = PaymentsArray.find(
      (payment) => payment.enum === subscription?.subscription
    );
    return res.send(payment);
  },

  hashPassword: (password: string): string => bcrypt.hashSync(password, 10),

  comparePassword: async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => bcrypt.compare(password, hashedPassword),

  forgetPassword: async (req: Request, res: Response) => {
    // INPUT;
    const { email } = req.body;
    // PROCEDURE
    // 1. Vérification / validation:
    if (!email) {
      return res.status(400).json({ message: "L'adresse email est requise" });
    }

    // 2. Action
    const user = await User.findOne({ email });
    console.log("user", user);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "15h" }
    );
    // but actuel: envoyer le token vers la bdd
    // update -> GOOD
    user.resetToken = token;
    await user.save(); // fait l'update sur la BDD;

    // TODO: envoyer l'email ->

    // 3. Output
    const emailUtil = new EmailUtil();

    emailUtil.sendMailAsync({
      fromEmail: "",
      destinationEmail: email,
      subject: "Reset password",
      // text: "",
      html: `<h1>Réinitialisation du mot de passe </h1><br>Veuillez cliquer sur ce lien : <br><a href="http://localhost:4200/reset-password/${token}">Reset password</a>`,
    });

    return res.status(200).json({ message: "Email sent" });
  },

  resetPassword: async (req: Request, res: Response) => {
    // INPUT
    const { password, token } = req.body;
    // PROCEDURE
    // 1. Vérification / validation:
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }
    // 2. Action
    const user = await User.findOne({ resetToken: token });
    if (!user) {
      return res.status(400).json({ message: "User not found" }); // TODO changer en 404
    }
    user.password = userService.hashPassword(password);

    user.resetToken = undefined;
    await user.save();
    console.log("user has been saved in reset password");
    // 3. Output
    return res.status(200).json({ message: "Password updated" });
  },

  updateCurrentUser: async (req: Request, res: Response) => {
    // INPUT
    console.log("calling UPDATE CURRENT USER :)");

    try {
      const myCurrentUser = req.user;
      const { firstName, lastName, email, oldPassword, newPassword } = req.body;

      // PROCEDURE
      // 1. Vérification / validation:
      if (!firstName && !lastName && !email && !oldPassword && !newPassword) {
        return res.status(400).json({ message: "please add a field" });
      }

      // 2. Action
      const user = await User.findOne({ _id: myCurrentUser.id });

      console.log("user has been found in update:", user);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      if (newPassword && oldPassword) {
        console.log("password details: oldPassword", oldPassword);
        const hashedOldPassword = userService.hashPassword(oldPassword);
        const isEqual = bcrypt.compareSync(oldPassword, user.password);
        if (!isEqual) {
          console.log("hashes are not the same:", {
            hashedOldPassword,
            hashCurrent: user.password,
          });
          return res.status(401).json({ message: "Old password is incorrect" });
        }

        const hashedPassword = userService.hashPassword(newPassword);
        user.password = hashedPassword;
      }

      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;

      await user.save();
      // 3. Output
      return res.status(200).json({ message: "User updated" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  updateEmail: async (req: Request, res: Response) => {
    // INPUT
    console.log(req.body);

    const { email } = req.body;
    // PROCEDURE
    // 1. Vérification / validation:
    if (!email) {
      return res.status(400).json({ message: "L'adresse email est requise" });
    }
    // 2. Action
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const userEmail = await User.findOne({ email: email });
    if (userEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    user.email = email;
    await user.save();
    // 3. Output
    return res.status(200).json({ message: "Email updated" });
  },

  updatePassword: async (req: Request, res: Response) => {
    // INPUT
    const { password, confirmPassword, oldPassword } = req.body;
    // PROCEDURE
    // 1. Vérification / validation:
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    console.log(req.body);

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords should match" });
    }
    // 2. Action
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // 3. Validate password
    const isValid = await userService.comparePassword(
      oldPassword,
      user.password
    );
    if (!isValid) {
      return res
        .status(401)
        .json({ message: "Votre ancien mot de passe n'est pas correct !" });
    }
    user.password = userService.hashPassword(password);
    await user.save();
    // 3. Output
    return res.status(200).json({ message: "Password updated" });
  },

  getUserById: async (req: Request, res: Response) => {
    // INPUT
    const { id } = req.params;
    // PROCEDURE
    // 1. Vérification / validation:
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    // 2. Action
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // 3. Output
    return res.status(200).json(user);
  },

  uploadImage: async (req: Request, res: Response) => {
    // INPUT

    //const { id } = req.params;
    console.log("je suis las");
    const { id } = req.user;

    let image = req.file;
    // console.log("image", image);

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    console.log("AWS HERE upload image", req.file);
    const s3Util = new S3Util();
    // Upload IMage S3
    const data = await s3Util.upload(req.file as Express.Multer.File);

    console.log("key", data.Key);

    const key = data.Key;

    const user = await User.findOne({
      _id: id,
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.imageUrl = key;
    await user.save(); // update

    const imageUrl = await s3Util.get(key);
    return res.status(200).send({ imageUrl });
  },

  me: async (req: Request, res: Response) => {
    const { id } = req.user;
    const user = await User.findById(id).select("-password -resetToken -role");
    const s3Util = new S3Util();
    if (!user) {
      return res.status(400).json({ message: "User me not found" });
    }
    const imageUrl = await s3Util.get(
      user.imageUrl || "https://via.placeholder.com/300"
    );
    return res.send({
      ...user,
      imageUrl,
    });
  },
};

export default userService;
