import { IMaterial } from "./material.interface";
import { IUserPost } from "./user.interface";

export interface IMaterialReservationInput {
  _id?: string;
  materialId: string | IMaterial;
  userId?: string | IUserPost;
  quantity?: number;
  date?: Date;
}
