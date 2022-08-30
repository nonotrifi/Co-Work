import { ISpace } from "./space.interface";
import { IUserPost } from "./user.interface";

export interface IReservation {
  _id: string;
  userId: string | IUserPost;
  spaceId: string | ISpace;
  startDate: Date;
  endDate: Date;
  meeetingRoom: string;
  callRoom: string;
}
