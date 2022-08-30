import { Request, Response } from "express";
import materialService from "../services/material.service";

const materialController = {
  getAll: (req: Request, res: Response) => {
    return materialService.getMaterials(res);
  },
  getBySpaceId: (req: Request, res: Response) => {
    return materialService.getMaterialsBySpaceId(req, res);
  },
  create: (req: Request, res: Response) => {
    return materialService.createMaterial(req, res);
  },
  deleteMaterials: (req: Request, res: Response) => {
    return materialService.delete(req, res);
  },
  delete: (req: Request, res: Response) => {
    return materialService.delete(req, res);
  },
  reserve: (req: Request, res: Response) => {
    return materialService.reserveMaterial(req, res);
  },
  getReservations: (req: Request, res: Response) => {
    return materialService.getMaterialReservations(req, res);
  },

  getReservationsByUser: (req: Request, res: Response) => {
    return materialService.getMaterialReservationsByUserId(req, res);
  },
  getPersonalReservations: (req: Request, res: Response) => {
    return materialService.getPersonalMaterialReservations(req, res);
  },
  deleteMaterialReservation: (req: Request, res: Response) => {
    return materialService.deleteMaterialReservation(req, res);
  }
  

}

export default materialController;
