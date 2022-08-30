import { Request, Response } from "express";
import reservationService from "../services/reservation.service";

const reservationController = {
  getAllReservations: (req: Request, res: Response) => {
    return reservationService.getReservations(res, req);
  },
  reservation: (req: Request, res: Response) => {
    return reservationService.reservation(req, res);
  },
  deleteReservation: (req: Request, res: Response) => {
    return reservationService.deleteReservation(req, res);
  },
  getPersonalReservations: (req: Request, res: Response) => {
    return reservationService.getPersonalReservations(res, req);
  },
};

export default reservationController;
