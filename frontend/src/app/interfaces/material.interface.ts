import { ISpace } from "./space.interface";

export interface IMaterial {
  _id: string;
  name: string;
  limit: number;
  reservations: Array<{ date: Date; quantity: Number }>;
  spaceId: string | ISpace;
}
