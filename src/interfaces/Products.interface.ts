export interface Product {
  id: number;
  name: string;
  description?: string;
  vendorCode: string;
  picture?: string;
  price: number;
  sale?: number
};

export enum Sort {
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc',
};

export type SortOptions = { name: string, code: Sort };

