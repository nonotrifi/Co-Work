import { Request, Response, Router } from "express";

import reservationController from "../controllers/reservation.controller";

import userMiddleware from "../middleware/user.middleware";
import storageMiddleware from "../middleware/upload.middleware";
import multer from "multer";

const upload = multer({ storage: storageMiddleware });
const router = Router();


router.get(
  "/",
  userMiddleware.isAuthenticated,
  reservationController.getAllReservations
);

router.get(
  "/me",
  userMiddleware.isAuthenticated,
  reservationController.getPersonalReservations
);


router.post(
  "/:id",
  userMiddleware.isAuthenticated,
  reservationController.reservation
);

router.delete(
  "/:id",
  userMiddleware.isAuthenticated,
  reservationController.deleteReservation
);

export default router;
