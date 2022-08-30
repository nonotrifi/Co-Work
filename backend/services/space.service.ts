import Space from "../models/space.model";
import { Request, Response } from "express";
import S3Util from "../utils/s3";
import Reservation from "../models/reservation.model";
import User from "../models/user.model";
import emailService from "./email.service";
import { IParams } from "../types/email";
import EmailUtil from "../utils/email";
import materialModel from "../models/material.model";
import eventModel from "../models/event.model";
import SpaceUtils from "../utils/space";


let spaceUtils = new SpaceUtils();

const spaceService = {
  getSpaces: async (res: Response) => {
    try {
      const spaces = await Space.find();
      const s3Util = new S3Util();
      // for async to get the images
      const promises = spaces.map(async (space) => {
        if (space.image) {
          const imageUrl = await s3Util.get(space.image as string);
          space.image = imageUrl;
          return space;
        }
        space.image = process.env.DEFAULT_IMAGE_URL;
        return space;
      });
      const spacesWithImage = await Promise.all(promises);

      return res.json(spacesWithImage);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },

  getSpace: async (req: Request, res: Response) => {
    try {
      const space = await Space.findById(req.params.id);
      if (!space) {
        return res.status(404).json({ message: "Space not found" });
      }
      if (space.image) {
        const s3Util = new S3Util();
        const imageUrl = await s3Util.get(space.image as string);
        space.image = imageUrl;
      } else {
        space.image = process.env.DEFAULT_IMAGE_URL;
      }
      return res.json(space);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },

  createSpace: async (req: Request, res: Response) => {
    try {
      console.log("user:", req.user);
      console.log("body: ", req.body);
      console.log("file: ", req.file);
      let key: string | undefined;
      if (req.file) {
        const s3Util = new S3Util();
        const data = await s3Util.upload(req.file as Express.Multer.File);
        key = data.Key;
      }
      const space = await Space.create({
        ...req.body,
        // only admin can create
        adminId: req.user.id,
        image: key,
      });
      return res.status(201).json(space); // 201 CREATED
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  },

  deleteSpace: async (req: Request, res: Response) => {
    try {

      const spaceId = req.params.id;
      const space = await Space.findByIdAndDelete(spaceId);
      const s3Util = new S3Util();

      await spaceUtils.purgeSpace(spaceId);
      
      if (space?.image) {
        await s3Util.delete(space.image as string);
      }
      console.log("deleted content 204");
      return res.status(204).json(); // NO CONTENT
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad Request" });
    }
  },



  // Pour graphique
  getTop: async (req: Request, res: Response) => {
    try {
      // const reservations = await Reservation.find();

      const reservations = await Reservation.aggregate([
        // {
        //   $match : { "createdAt": { $gte: new ISODate("2014-01-01"), $lt: new ISODate("2015-01-01") } }
        // },
        {
          $group: {
            _id: {
              date: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
              spaceId: "$spaceId",
            },
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: "$_id.spaceId",
            count: { $push: { reservationDate: "$_id.date", count: "$count" } },
          },
        },
      ]).limit(4);
      // const promises: Array<any> = [];
      const result: Array<any> = [];
      // reservations.forEach(async (reservation) => {
      //   const space = await Space.findById(reservation._id);
      //   console.log(space);
      //   result.push({
      //     ...reservation,
      //     space,
      //   });
      //   // promises.push(Space.findById(reservation._id));
      // });
      await Promise.all(
        reservations.map(async (reservation) => {
          const space = await Space.findById(reservation._id).select("title");
          result.push({
            ...reservation,
            count: reservation.count
              .sort(
                (objA: any, objB: any) =>
                  Number(new Date(objA.reservationDate)) -
                  Number(new Date(objB.reservationDate))
              ),
            space: space?.title,
          });
        })
      );

      // const resolved = await Promise.all(promises);

      // const spaces = await Space.find().where();
      return res.send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Bad Request" });
    }
  },
};

export default spaceService;
