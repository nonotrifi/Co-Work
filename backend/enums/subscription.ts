enum Subscription {
  NORMALMONTHLY = "NORMALMONTHLY",
  NORMALANUALLY = "NORMALANUALLY",
  PREMIUMMONTHLY = "PREMIUMMONTHLY",
  PREMIUMANUALLY = "PREMIUMANUALLY",
}

export type PaymentType = {
  title: string;
  enum: Subscription;
  id: string;
  price: number;
}

export const PaymentsArray: Array<PaymentType> = [
  {
    title: "Abonnement basic",
    enum: Subscription.NORMALMONTHLY,
    id: "price_1LV2qILgo658MnS57wzZnsmW",
    price: 24,
  },
  {
    title: "Normal Anually",
    enum: Subscription.NORMALANUALLY,
    id: "price_1LV2qILgo658MnS57wzZnsmW",
    price: 20,
  },
  {
    title: "Premium Monthly",
    enum: Subscription.PREMIUMMONTHLY,
    id: "price_1LV2qILgo658MnS57wzZnsmW",
    price: 300,
  },
  {
    title: "Premium Anually",
    enum: Subscription.PREMIUMANUALLY,
    id: "price_1LV2qILgo658MnS57wzZnsmW",
    price: 252,
  },
];

export default Subscription;
