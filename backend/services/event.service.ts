import { Request, Response } from "express";
import S3Util from "../utils/s3";
import Event from "../models/event.model";
import User from "../models/user.model";
import { IParams } from "../types/email";
import ReservationEvent from "../models/reservationEvent.model";
import Space from "../models/space.model";
import EmailUtil from "../utils/email";

let emailUtil = new EmailUtil();

const eventService = {
  getEvents: async (req: Request, res: Response) => {
    const { withoutImages } = req.query;
    try {
      const events = await Event.find().populate({
        path: "spaceId",
        select: "title",
      });
      if (withoutImages) {
        return res.json(events);
      }
      const s3Util = new S3Util();
      const promises = events.map(async (event) => {
        if (event.image) {
          const imageUrl = await s3Util.get(event.image as string);
          event.image = imageUrl;
          return event;
        }
        event.image = process.env.DEFAULT_IMAGE_URL;
        return event;
      });
      const eventWithImage = await Promise.all(promises);
      return res.json(eventWithImage);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },

  createEvent: async (req: Request, res: Response) => {
    try {
      let key: string | undefined;
      if (req.file) {
        const s3Util = new S3Util();
        const data = await s3Util.upload(req.file as Express.Multer.File);
        key = data.Key;
      }
      const event = await Event.create({
        ...req.body,
        image: key,
      });
      return res.status(201).json(event); // 201 CREATED
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  },

  deleteEvent: async (req: Request, res: Response) => {
    try {
      console.log("appel de deleteEvent");

      const event = await Event.findByIdAndDelete(req.params.id);

      const s3Util = new S3Util();
      if (event?.image) {
        await s3Util.delete(event.image as string);
      }
      return res.status(204).json({ message: "Deleted" }); // NO CONTENT
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  },

  reserveEvent: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    try {
      const event = await Event.findByIdAndUpdate(
        id,
        {
          reservedBy: userId,
        },
        {
          new: true,
        }
      );
      const user = await User.findById(userId);

      const emailBody: IParams = {
        destinationEmail: user?.email || "",
        fromEmail: process.env.EMAIL_FROM || "",
        subject: "Reservation Confirmation",
        text: "",
        html: `<h1>Votre réservation a bien été prise en compte</h1> <p>Vous avez réservé l'évènement ${event?.title}</p>`,
      };
      console.log(event);
      return res.status(204).json({ message: "Updated" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  },

  getEventsReservations: async (req: Request, res: Response) => {
    // const { id } = req.params;
    try {
      const reservations = await ReservationEvent.find()
        .populate({
          path: "eventId",
          select: "title",
          populate: {
            path: "spaceId",
            select: "title",
          },
        })
        .populate({
          path: "userId",
          select: "email",
        });
      return res.status(200).json(reservations);
    } catch (err) {
      console.error(err);
      return res.status(500).json("Error");
    }
  },

  deleteEventReservation: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const event = await ReservationEvent.findByIdAndDelete(id);
      return res.status(200).json(event);
    } catch (err) {
      console.error(err);
      return res.status(500).json("Error");
    }
  },

  // deleteEventReservation: async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   // const { id: userId } = req.user;
  //   try {
  //     const event = await Event.findByIdAndDelete(
  //       id,
  //       {
  //         reservedBy: null,
  //       }
  //       // {
  //       //   new: true,
  //       // }
  //     );
  //     // console.log(event);
  //     return res
  //       .status(200)
  //       .json({ message: "Suppression terminée avec succèes !" });
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(400).json({ message: "Bad Request" });
  //   }
  // },

  getPersonalEventsReservations: async (req: Request, res: Response) => {
    // const { id } = req.params;
    try {
      const reservations = await ReservationEvent.find({
        userId: req.user.id,
      }).populate({
        path: "eventId",
        select: "title",
        populate: {
          path: "spaceId",
          select: "title",
        },
      });

      return res.status(200).json(reservations);
    } catch (err) {
      console.error(err);
      return res.status(500).json("Error");
    }
  },

  // getPersonalEventsReservations: async (req: Request, res: Response) => {
  //   try {
  //     const reservations = await Event.find({ reservedBy: req.user.id })
  //       .populate("reservedBy", "email")
  //       .populate("spaceId", "title");
  //     return res.status(200).json(reservations);
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).json("Error");
  //   }
  // },

  createEventReservation: async (req: Request, res: Response) => {
    const { eventId } = req.body;
    // const { id: userId } = req.user;
    // console.log(req.body);

    try {
      const eventFound = await Event.findById(eventId).populate(
        "spaceId",
        "title"
      );
      console.log("eventFound", eventFound);


      if (!eventFound) {
        return res
          .status(500)
          .json({ message: "Event not found using id: " } + eventId);
      }

      // console.log("eventFound => ", eventFound);

      // ?????
      // checker si l'event est déjà réservé par l'utilisateur
      // - donc: checker dans la table ReservationEvent
      // - si oui, on ne peut pas réserver
      
      const oldReservation  = await ReservationEvent.findOne({
        eventId: eventId,
        userId: req.user.id,
      });
      if(oldReservation) {
       // on retourne l'erreur.
        return res.status(400).json({ message: "Evènement déjà reservé" });
       console.log("oldReservation", oldReservation);
       
      }
      
      const newReservation = await ReservationEvent.create({
        eventId,

        userId: req.user.id,
      });
      
      console.log("newReservation => ", newReservation);

      const user = await User.findById(req.user.id);

      const emailBody: IParams = {
        destinationEmail: user?.email || "",
        fromEmail: process.env.EMAIL_FROM || "",
        subject: "Reservation Confirmation",
        text: "",
        html: `<h1>Votre réservation a bien été prise en compte</h1> <p>Vous avez réservé l'évènement ${eventFound?.title} </p>`,
      };

      const response = await emailUtil.sendMailAsync(emailBody);

      return res
        .status(200)
        .json({ message: "Reservation created successfully" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  },
};
export default eventService;
