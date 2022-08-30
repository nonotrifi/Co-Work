import { Request, Response } from "express";
import eventService from "../services/event.service";

const eventController = {
  getAll: (req: Request, res: Response) => {
    return eventService.getEvents(req, res);
  },
  create: (req: Request, res: Response) => {
    return eventService.createEvent(req, res);
  },
  delete: (req: Request, res: Response) => {
    return eventService.deleteEvent(req, res);
  },
  reserveEvent: (req: Request, res: Response) => {
    return eventService.reserveEvent(req, res);
  },
  getEventsReservations: (req: Request, res: Response) => {
    return eventService.getEventsReservations(req, res);
  },
  deleteEventReservation: (req: Request, res: Response) => {
    return eventService.deleteEventReservation(req, res);
  },
  getPersonalEventsReservations: (req: Request, res: Response) => {
    return eventService.getPersonalEventsReservations(req, res);
  },
  makeEventReservation: (req: Request, res: Response) => {
    return eventService.createEventReservation(req, res);
  }

};

export default eventController;
