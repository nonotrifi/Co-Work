import { Request, Response } from "express";
import S3Util from "../utils/s3";
import Reservation from "../models/reservation.model";
import User from "../models/user.model";
import emailService from "./email.service";
import { IParams } from "../types/email";
import EmailUtil from "../utils/email";
import Space from "../models/space.model";
import { IReservation } from "../types/reservation";

let emailUtil = new EmailUtil();

const reservationService = {
  reservation: async (req: Request, res: Response) => {
    try {
      const space = await Space.findById(req.params.id);
      if (!space) {
        return res.status(404).json({ message: "Space not found" });
      }
      console.log("req.params => ", req.params);
      console.log("req.body => ", req.body);

      console.log("space: => ", space);

      const roomType = (req.body.roomType as string) || "meetingRoom";
      console.log("roomType: => ", roomType);

      let rooms = 0;
      // @ts-ignore
      rooms = space[roomType];
      const reservations = await Reservation.find({
        spaceId: space._id,
      });

      console.log("reservations: => ", reservations);

      reservations.forEach((reservation) => {
        const endDate = reservation.endDate as Date;
        if (endDate > new Date()) {
          // @ts-ignore
          rooms -= reservation[roomType];
        }
      });

      const totalRooms = rooms;
      console.log("totalRooms: => ", totalRooms);
      console.log("req.body.roomsNumber => ²", req.body.roomsNumber);

      if (totalRooms < req.body.roomsNumber) {
        if (totalRooms === 0) {
          return res.status(400).json({ message: "Les salles sont indisponibles" });
        }
        return res.status(400).json({
          message: `Not enough ${roomType.replace("Room", "")} rooms`,
        });
      }

      const reservation = await Reservation.create({
        spaceId: space._id,
        userId: req.user.id,
        ...req.body,
      });

      console.log("create reservation: => ", reservation);

      const user = await User.findById(req.user.id);
      console.log("req.user.id => ", req.user.id);

      const emailBody: IParams = {
        destinationEmail: user?.email || "",
        fromEmail: user?.email || "",
        subject: "Reservation Confirmation",
        text: "",
        html: `<h1>Résevation terminée avec succès, vous avez réservé ${
          req.body.roomsNumber
        } ${roomType.replace("Room", "")} room(s) de ${req.body.startDate} jusqu'au ${
          req.body.endDate
        }</h1>`,
      };

      console.log("emailBody: => ", emailBody);
      const response = await emailUtil.sendMailAsync(emailBody);

      console.log("response: = >", response);

      return res.status(201).json(reservation); // 201 CREATED
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  },

  getReservations: async (res: Response, req: Request) => {
    try {
      // dans la classe user on a provider, cette classe est référencé a la classe User (ou on peut voir les proprité
      // firstName, lastName, email et role) Nous allons donc les afficher ici en les mettant en deuxième paramètre
      // populate("provider") signifie que quand je vais dans le modèle product
      const reservations = await Reservation.find()
        .populate("userId")
        .populate("spaceId");
      return res.status(200).json(reservations);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  },

  getReservationsBySpaceId: async (res: Response, req: Request) => {
    try {
      // dans la classe user on a provider, cette classe est référencé a la classe User (ou on peut voir les proprité
      // firstName, lastName, email et role) Nous allons donc les afficher ici en les mettant en deuxième paramètre
      // populate("provider") signifie que quand je vais dans le modèle product

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const space = await Space.findById(req.params.id);
      if (!space) {
        return res.status(404).json({ message: "Space not found" });
      }

      const reservations = await Reservation.find({
        userId: user._id,
        spaceId: space._id,
      });
      return res.status(200).json(reservations);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  },

  getReservation: async (req: Request, res: Response) => {
    try {
      const reservation = await Reservation.findById(req.params.id);
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      return res.status(200).json(reservation);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  },

  deleteReservation: async (req: Request, res: Response) => {
    try {
      const reservation = await Reservation.findByIdAndDelete(req.params.id);
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      return res.status(200).json(reservation);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  },

  getPersonalReservations: async (res: Response, req: Request) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const reservations = await Reservation.find({
        userId: user._id,
      }).populate("spaceId", "title");
      return res.status(200).json(reservations);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  },
};

export default reservationService;
