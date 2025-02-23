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

export interface OthersFilters {
  description: boolean | null,
  sale: boolean | null,
  picture: boolean | null,
};

export interface DataAddProduct {
  name: string;
  vendorCode: string;
  price: number;
  description: string | null;
  sale: number | null;
};

export interface ProductsState {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  sort: SortOptions | null;
  filter: {
    price: [number, number] | null,
    description: boolean | null,
    sale: boolean | null,
    picture: boolean | null,
    [key: string]: boolean | [number, number] | null,
  },
  isLoading: boolean;
  isLoadingAddProduct: boolean;
  error: string;
};
export interface DetailsProductState {
  product: Product | null;
  isLoading: boolean;
  error: string;
};