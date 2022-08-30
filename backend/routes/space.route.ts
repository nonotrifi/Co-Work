import { Request, Response, Router } from "express";
import spaceController from "../controllers/space.controller";
import userMiddleware from "../middleware/user.middleware";
import storageMiddleware from "../middleware/upload.middleware";
import multer from "multer";
import S3Util from "../utils/s3";

const upload = multer({ storage: storageMiddleware });
const router = Router();

router.get("/top", spaceController.getTop);

router.get("/", spaceController.getAll);
router.post(
  "/",
  userMiddleware.isAuthenticated,
  // userMiddleware.isAdmin,
  upload.single("image"),
  spaceController.create
);

router.get("/:id", spaceController.getSpace);

// router.options("/:id", spaceController.option);

router.delete(
  "/:id",
  userMiddleware.isAuthenticated,
  userMiddleware.isAdmin,
  spaceController.delete
);

// router.post(
//   "/upload",
//   upload.single("image"),
//   async (req: Request, res: Response) => {
//     console.log(req.file);
//     const s3Util = new S3Util();
//     const data = await s3Util.upload(req.file as Express.Multer.File);
//     console.log(data);
//     res.send("ok");
//   }
// );

export default router;
