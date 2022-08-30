import SubscriptionEnum from '../enums/subscription.enum';

export default class UserModel {
  _id?: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  role?: string;
  subscription?: SubscriptionEnum;
  imageUrl?: string
}
