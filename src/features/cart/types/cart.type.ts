export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  _id: string;
  id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  subcategory: Subcategory[];
  ratingsAverage: number;
}

export interface CartProduct {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  totalCartPrice: number;
  totalPriceAfterDiscount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  cartId?: string;
  data: CartData;
}
