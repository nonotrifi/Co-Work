import SpaceModel from "./space.model";

export default class MaterialModel {
  _id!: string;
  name!: string;
  limit!: number;
  reservations!: Array<{ date: Date; quantity: Number }>;
  spaceId!: string | SpaceModel;
}
