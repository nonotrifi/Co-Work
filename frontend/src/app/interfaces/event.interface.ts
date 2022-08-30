import { ISpace } from './space.interface';

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  image: string;
  spaceId: string | ISpace;
  titleSpace: string;
}
