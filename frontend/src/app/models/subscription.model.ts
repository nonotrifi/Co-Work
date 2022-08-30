import SubscriptionEnum from "../enums/subscription.enum";

export default class SubscriptionModel {
  _id!: string;
  startDate!: Date;
  endDate!: Date;
  subscription!: SubscriptionEnum;
  clientId!: string;
}
