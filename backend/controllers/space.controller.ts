import { Request, Response } from "express";
import spaceService from "../services/space.service";

const spaceController = {
  getAll: (req: Request, res: Response) => {
    return spaceService.getSpaces(res);
  },
  getSpace: (req: Request, res: Response) => {
    return spaceService.getSpace(req, res);
  },
  create: (req: Request, res: Response) => {
    return spaceService.createSpace(req, res);
  },
  delete: (req: Request, res: Response) => {
    return spaceService.deleteSpace(req, res);
  },
  getTop: (req: Request, res: Response) => {
    return spaceService.getTop(req, res);
  },
};

export default spaceController;
