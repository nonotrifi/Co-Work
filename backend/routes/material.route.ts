import { Route53RecoveryCluster } from "aws-sdk";
import { Router } from "express";
import materialController from "../controllers/material.controller";
import userController from "../controllers/user.controller";
import userMiddleware from "../middleware/user.middleware";

const router = Router();

router.post("/", materialController.create);
router.get("/space/:id", materialController.getBySpaceId);


router.delete("/:id", materialController.delete);

router.get("/", materialController.getAll);
router.post(
  "/reservation",
  userMiddleware.isAuthenticated,
  userMiddleware.isClient,
  materialController.reserve
);

router.get("/reservations", materialController.getReservations);

router.get(
  "/reservations/me",
  userMiddleware.isAuthenticated,
  userMiddleware.isClient,
  materialController.getPersonalReservations
);
router.get("/reservations/:id", materialController.getReservationsByUser);

router.delete(
  "/reservations/:id",
  materialController.deleteMaterialReservation
);
// TODO router: reservations by userId
// TODO router: my reservations only

export default router;
