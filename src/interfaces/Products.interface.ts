export interface Product {
  id: number;
  name: string;
  description?: string;
  vendorCode: string;
  picture?: string;
  price: number;
  sale?: number
};