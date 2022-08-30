import { Router} from "express";
import emailController from "../controllers/email.controller";
import userMiddleware from "../middleware/user.middleware";

const router = Router();

router.post('', emailController.receiveEmail);

export default router;

