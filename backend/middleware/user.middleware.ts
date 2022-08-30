import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import RoleEnum from "../enums/role.enum";
import { User } from "../types/user";

const userMiddleware = {
  isAuthenticated: (req: Request, res: Response, next: NextFunction) => {
    // console.log("isAuthenticated is called with :", { auth: req.headers.authorization});
    
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      if (userMiddleware.isValidToken(token)) {

        const user = jsonwebtoken.decode(token) as User;
        req.user = user;
        return next();
      }
    }

    return res.status(401).json({ message: "Unauthorized" });
  },
  isValidToken: (token: string) => {
    try {
      jsonwebtoken.verify(token, process.env.JWT_SECRET || "secret");
      return true;
    } catch (err) {
      return false;
    }
  },

  isAdmin: (req: Request, res: Response, next: NextFunction) => {
    // console.log("middleware isAdmin working...");    
    if (req.user && req.user.role === RoleEnum.ADMIN) {
      return next();
    }
    return res.status(403).json({ message: "Forbidden" });
  },
  isClient: (req: Request, res: Response, next: NextFunction) => {
    
    if (
      req.user &&
      (req.user.role === RoleEnum.CLIENT || req.user.role === RoleEnum.ADMIN)
    ) {
      return next();
    }
    return res.status(403).json({ message: "Forbidden" });
  },
  isManager: (req: Request, res: Response, next: NextFunction) => {
    if (
      req.user &&
      (req.user.role === RoleEnum.MANAGER || req.user.role === RoleEnum.ADMIN)
    ) {
      return next();
    }
    return res.status(403).json({ message: "Forbidden" });
  },
};

export default userMiddleware;
