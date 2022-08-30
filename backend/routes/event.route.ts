import { Router } from "express";
import eventController from "../controllers/event.controller";
import userMiddleware from "../middleware/user.middleware";
import storageMiddleware from "../middleware/upload.middleware";
import multer from "multer";

const upload = multer({ storage: storageMiddleware });
const router = Router();

router.get("/", eventController.getAll);

router.post(
  "/",
  userMiddleware.isAuthenticated,
  userMiddleware.isAdmin,
  upload.single("image"),
  eventController.create
);

router.post(
  "/makeEventReservation",
  userMiddleware.isAuthenticated,
  eventController.makeEventReservation
);

router.get(
  "/reservations/me",
  userMiddleware.isAuthenticated,
  userMiddleware.isClient,
  eventController.getPersonalEventsReservations
);
router.get(
  "/reservations",
  // userMiddleware.isAdmin,
  eventController.getEventsReservations
);
router.delete(
  "/:id",
  userMiddleware.isAuthenticated,
  userMiddleware.isAdmin,
  eventController.delete
);

router.put(
  "/:id",
  userMiddleware.isAuthenticated,
  userMiddleware.isClient,
  eventController.reserveEvent
);

router.delete("/reservations/:id", eventController.deleteEventReservation);

export default router;
