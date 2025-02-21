import { Product } from "./Products.interface";

export interface DataProducts {
  limit: number;
  page: number;
  total: number;
  products: Product[];
};