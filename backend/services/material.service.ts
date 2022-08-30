import { Request, Response } from "express";
import S3Util from "../utils/s3";
import Material from "../models/material.model";
import ReservationMaterial from "../models/reservationMaterial.model";
import { IParams } from "../types/email";
import EmailUtil from "../utils/email";
import User from "../models/user.model";
import SpaceUtils from "../utils/space";

let emailUtil = new EmailUtil();
let spaceUtil = new SpaceUtils();

const materialService = {
  getMaterials: async (res: Response) => {
    try {
      const materials = await Material.find().populate("spaceId", "title");
      return res.status(200).json(materials);
    } catch (err) {
      return res.status(500).json("Materials not found");
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const materialId = req.params.id;

      const material = await Material.findByIdAndDelete(materialId);

      return res.json(material);
    } catch (err) {
      return res.status(500).json("Material not found");
    }
  },

  deleteMaterial: async (req: Request, res: Response) => {
    try {
      const materialId = req.params.id;
      const material = await Material.findByIdAndDelete(materialId);

      return res.status(200).json(material);
    } catch (err) {
      return res.status(500).json("Material not found");
    }
  },

  getMaterial: async (req: Request, res: Response) => {},

  getMaterialsBySpaceId: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const material = await Material.find({ spaceId: id });
      return res.status(200).json(material);
    } catch (err) {
      console.log(err);
      return res.status(500).json("Error");
    }
  },

  createMaterial: async (req: Request, res: Response) => {
    const { name, limit, spaceId } = req.body;
    const newMaterial = new Material({ name, limit, spaceId });
    try {
      const material = await newMaterial.save();
      return res.status(200).json(material);
    } catch (err) {
      console.log(err);
      return res.status(500).json("Error");
    }
  },

  reserveMaterial: async (req: Request, res: Response) => {
    const { quantity, materialId } = req.body;

    console.log("req body of reservation of material:", req.body);

    try {
      const today = new Date();
      const materialFound = await Material.findById(materialId);
      console.log("materialFound => ", materialFound);
      if (!materialFound) {
        return res
          .status(500)
          .json("Material is not found using id:" + materialId);
      }

      // on réserve uniquement pour la journée

      const reservationsOfTheMaterial = await ReservationMaterial.find({
        where: { materialId },
      });
      console.log("reservationsOfTheMaterial => ", reservationsOfTheMaterial);

      let quantityReserved = 0;
      if (reservationsOfTheMaterial instanceof Array) {
        reservationsOfTheMaterial.forEach((reservation: any) => {
          const resaDate = new Date(reservation.date.toDateString());
          const todayDate = new Date(today.toDateString());
          if (resaDate === todayDate) {
            quantityReserved += reservation.quantity;
          }
        });
      }
      if (
        // quantityReserved >= (materialFound?.limit as Number) ||
        quantityReserved + quantity >=
        (materialFound?.limit as Number)
      ) {
        return res.status(400).json({
          message: "Matériel plus disponibe aujourd'hui, revenez demain !",
        });
      }

      const newReservation = await ReservationMaterial.create({
        date: new Date(),
        quantity,
        userId: req.user.id,
        materialId,
      });

      console.log("newReservation: material", newReservation);

      const user = await User.findById(req.user.id);

      const emailBody: IParams = {
        destinationEmail: user?.email || "",
        fromEmail: process.env.EMAIL_FROM || "",
        subject: "Reservation Confirmation",
        text: "",
        html: `<h1>Votre réservation a bien été prise en compte</h1> <p>Vous avez réservé ${quantity} quantité de ${materialFound?.name}</p>`,
      };

      const response = await emailUtil.sendMailAsync(emailBody);

      return res.status(200).json(materialFound);
    } catch (err) {
      console.error(err);
      return res.status(500).json("Error");
    }
  },

  getMaterialReservations: async (req: Request, res: Response) => {
    // const { id } = req.params;
    try {
      const reservations = await ReservationMaterial.find()
        .populate("userId", "email")
        .populate({
          path: "materialId",
          select: "name",
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

  getMaterialReservationsByUserId: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const reservations = await ReservationMaterial.find({
        userId: id,
      }).populate("materialId", "name");
      return res.status(200).json(reservations);
    } catch (err) {
      console.error(err);
      return res.status(500).json("Error");
    }
  },

  getPersonalMaterialReservations: async (req: Request, res: Response) => {
    try {
      const reservations = await ReservationMaterial.find({
        userId: req.user.id,
      }).populate("materialId", "name");
      return res.status(200).json(reservations);
    } catch (err) {
      console.error(err);
      return res.status(500).json("Error");
    }
  },

  deleteMaterialReservation: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const reservation = await ReservationMaterial.findByIdAndDelete(id);
      return res.status(200).json(reservation);
    } catch (err) {
      console.error(err);
      return res.status(500).json("Error");
    }
  },
};

export default materialService;
