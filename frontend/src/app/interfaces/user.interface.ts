import SubscriptionEnum from "../enums/subscription.enum";

export interface IUserPost {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
  subscription?: SubscriptionEnum;
}
