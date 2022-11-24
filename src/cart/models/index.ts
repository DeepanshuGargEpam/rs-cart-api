export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type CartItem = {
  id: string;
  cartId?: string;
  cart?: Cart;
  productId?: string;
  product?: Product;
  count: number;
};

export type Cart = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  items: CartItem[];
};
