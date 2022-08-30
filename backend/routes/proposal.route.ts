import { Router} from "express";
import proposalController from "../controllers/proposal.controller";
import userMiddleware from "../middleware/user.middleware";
import storageMiddleware from "../middleware/upload.middleware";
import multer from "multer";

const upload = multer({ storage: storageMiddleware });
const router = Router();

router.get('/', proposalController.getAll);

router.post('/',
userMiddleware.isAuthenticated,
 userMiddleware.isAdmin, 
 upload.single("image"),
 proposalController.create);

router.delete('/:id', userMiddleware.isAuthenticated, userMiddleware.isAdmin, proposalController.delete);

export default router;