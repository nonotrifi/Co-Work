import SpaceModel from './space.model';

export default class EventModel {
  _id!: string;
  title!: string;
  description!: string;
  image!: string;
  spaceId!: string | SpaceModel;
  titleSpace!: string;
}
