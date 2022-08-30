import { Router } from "express";
import subscriptionController from "../controllers/subscription.controller";
import userMiddleware from "../middleware/user.middleware";

const router = Router();

router.get(
  "/",
  userMiddleware.isAuthenticated,
  userMiddleware.isManager,
  subscriptionController.getAll
);
router.get(
  "/me",
  userMiddleware.isAuthenticated,
  userMiddleware.isClient,
  subscriptionController.getMySubscription
);
router.get(
  "/:id",
  userMiddleware.isAuthenticated,
  userMiddleware.isAdmin,
  subscriptionController.getOne
);
router.post(
  "/",
  // validate the user is authenticated,
  // validate the user does not have a subscription,
  userMiddleware.isAuthenticated,
  userMiddleware.isClient,
  subscriptionController.create
);
router.put(
  "/:id",
  userMiddleware.isAuthenticated,
  userMiddleware.isClient,
  subscriptionController.update
);
router.delete(
  "/:id",
  userMiddleware.isAuthenticated,
  userMiddleware.isClient,
  subscriptionController.delete
);

router.post("/payment/", subscriptionController.payment);
router.post("/sendmail");

export default router;
