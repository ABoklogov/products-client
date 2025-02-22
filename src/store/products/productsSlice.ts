import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { DataProducts } from 'interfaces/Api.interface';
import { Product, SortOptions } from 'interfaces/Products.interface';

interface ProductsState {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  sort: SortOptions | null;
  isLoading: boolean;
  error: string;
};

const initialState: ProductsState = {
  items: [],
  total: 0,
  page: 1,
  limit: 6,
  sort: null,
  isLoading: false,
  error: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<DataProducts>) => ({
      ...state,
      items: [...action.payload.products],
      total: action.payload.total,
      limit: action.payload.limit,
      page: action.payload.page,
    }),
    setSort: (state, action: PayloadAction<SortOptions>) => ({
      ...state,
      sort: action.payload,
    }),
    setLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload,
    }),
    setError: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
    }),
  },
});

export const {
  setProducts,
  setSort,
  setLoading,
  setError,
} = productsSlice.actions;