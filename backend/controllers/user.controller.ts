import { Request, Response } from "express";
import userService from "../services/user.service";

const userController = {
  getAll: (req: Request, res: Response) => {
    return userService.getAll(res);
  },
  getUserById: (req: Request, res: Response) => {
    return userService.getUserById(req, res);
  },
  signUp: (req: Request, res: Response) => {
    return userService.signUp(req, res);
  },
  signIn: (req: Request, res: Response) => {
    // console.log('user is signing in.');
    return userService.signIn(req, res);
  },
  isAdmin: (req: Request, res: Response) => {
    // console.log('is Admin controller has been called;');
    // console.log('isAdmin user: ', req.user);
    return res.send(true);
  },
  updateEmail: (req: Request, res: Response) => {
    return userService.updateEmail(req, res);
  },
  updatePassword: (req: Request, res: Response) => {
    return userService.updatePassword(req, res);
  },

  updateCurrentUser: (req: Request, res: Response) => {
    return userService.updateCurrentUser(req, res);
  },

  isClient: (req: Request, res: Response) => {
    return res.send(true);
  },

  hasPayment: (req: Request, res: Response) => {
    return userService.hasPayment(req, res);
  },

  getPaymentType: (req: Request, res: Response) => {
    return userService.getPaymentType(req, res);
  },
  forgetPassword: (req: Request, res: Response) => {
    return userService.forgetPassword(req, res);
  },
  resetPassword: (req: Request, res: Response) => {
    console.log("just called resetPassword controller!!...");
    return userService.resetPassword(req, res);
  },
  upload: (req: Request, res: Response) => {
    return userService.uploadImage(req, res);
  },
  me: (req: Request, res: Response) => {
    return userService.me(req, res);
  },
  deleteUser: (req: Request, res: Response) => {
    return userService.delete(res, req);
  },
  deleteMe: (req: Request, res: Response) => {
    console.log('Coucou je passe dans DeleteMe !')
    return userService.deleteMe(res, req);
  },
};

export default userController;
