export class ReservationModel {
  _id!: string;
  userId!: string;
  spaceId!: string;
  startDate!: Date;
  endDate!: Date;
  meeetingRoom!: string;
  callRoom!: string;
}

export default ReservationModel;
