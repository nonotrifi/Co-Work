enum SubscriptionEnum {
  NORMALMONTHLY = 'NORMALMONTHLY',
  NORMALANUALLY = 'NORMALANUALLY',
  PREMIUMMONTHLY = 'PREMIUMMONTHLY',
  PREMIUMANUALLY = 'PREMIUMANUALLY',
}

export type PaymentType = {
  title: string;
  enum: SubscriptionEnum;
  id: string;
  price: number;
}

export default SubscriptionEnum;
