export type Products = {
  game_slug: string;
  slug: string;
  amount: number;
  price: number;
};

export type PaymentMethods = {
  slug: string;
  name: string;
  type: string;
  logo_path: string;
};

export type TopUp = {
  name: string;
  publisher: string;
  currency: string;
  image: string;
  products: Products[];
  payment_methods: PaymentMethods[];
};
