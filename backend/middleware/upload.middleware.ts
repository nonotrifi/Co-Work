import { Request, Response, Router } from "express";
import multer from "multer";

const storageMiddleware = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: Function
  ): void {
    cb(null, "uploads");
  },
  filename: function (req: Request, file: Express.Multer.File, cb: Function) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export default storageMiddleware;
