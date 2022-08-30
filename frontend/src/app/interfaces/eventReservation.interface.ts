
import { IUserPost } from "./user.interface";
import {IEvent} from "./event.interface";
import {ISpace} from "./space.interface";

export interface IEventReservationInput {
  _id?: string;
  spaceId?: string | ISpace;
  eventId: string | IEvent;
  userId?: string | IUserPost;

}
