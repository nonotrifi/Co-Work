import { Router } from "express";
import userController from "../controllers/user.controller";
import userMiddleware from "../middleware/user.middleware";
const router = Router();
import multer from "multer";
import S3Util from "../utils/s3";
import storageMiddleware from "../middleware/upload.middleware";

const upload = multer({ storage: storageMiddleware });

router.post(
  "/uploadImage",
  userMiddleware.isAuthenticated,
  upload.single("image"),
  userController.upload
);

router.get("/", userController.getAll);
router.get("/getUser/me", userMiddleware.isAuthenticated, userController.me);

// Keep those 4 routes before /users/:id
router.get(
  "/isClient",
  userMiddleware.isAuthenticated,
  userMiddleware.isClient,
  userController.isClient
);

router.get(
  "/isAdmin",
  userMiddleware.isAuthenticated,
  userMiddleware.isAdmin,
  userController.isAdmin
);

router.get(
  "/hasPayment",
  userMiddleware.isAuthenticated,
  userMiddleware.isClient,
  userController.hasPayment
);

router.get(
  "/getPaymentType",
  userMiddleware.isAuthenticated,
  userMiddleware.isClient,
  userController.getPaymentType
);

router.post("/forgetPassword", userController.forgetPassword);
router.post("/resetPassword", userController.resetPassword);


router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);

router.delete("/deleteUser/me", userMiddleware.isAuthenticated, userController.deleteMe);


router.post(
  "/updateCurrentUser",
  userMiddleware.isAuthenticated,
  userController.updateCurrentUser
);

router.get("/:id", userMiddleware.isAuthenticated, userController.getUserById);
router.put(
  "/updateEmail",
  userMiddleware.isAuthenticated,
  userController.updateEmail
);
router.put(
  "/updatePassword",
  userMiddleware.isAuthenticated,
  userController.updatePassword
);

router.delete(
  "/:id",
  userMiddleware.isAuthenticated,
  userController.deleteUser
);


export default router;
