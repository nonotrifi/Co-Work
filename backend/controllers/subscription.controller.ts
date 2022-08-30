import { Request, Response } from "express";
import subscriptionService from "../services/subscription.service";

const subscriptionController = {
  getAll: (req: Request, res: Response) => {
    return subscriptionService.getSubscriptions(res);
  },
  getOne: (req: Request, res: Response) => {
    return subscriptionService.getSubscription(req, res);
  },
  getMySubscription: (req: Request, res: Response) => {
    return subscriptionService.getMySubscription(req, res);
  },
  create: (req: Request, res: Response) => {
    return subscriptionService.createSubscription(req, res);
  },
  update: (req: Request, res: Response) => {
    return subscriptionService.updateSubscription(req, res);
  },
  delete: (req: Request, res: Response) => {
    return subscriptionService.deleteSubscription(req, res);
  },

  payment: (req: Request, res: Response) => {
    return subscriptionService.payment(req, res);
  },
};

export default subscriptionController;
