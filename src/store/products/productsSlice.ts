import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { DataProducts } from 'interfaces/Api.interface';
import { Product } from 'interfaces/Products.interface';

interface ProductsState {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  error: string;
};

const initialState: ProductsState = {
  items: [],
  total: 0,
  page: 1,
  limit: 6,
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
  setLoading,
  setError,
} = productsSlice.actions;