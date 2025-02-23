import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { DetailsProductState, Product } from 'interfaces/Products.interface';

const initialState: DetailsProductState = {
  product: null,
  isLoading: false,
  error: '',
};

export const detailsProductSlice = createSlice({
  name: 'detailsProduct',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => ({
      ...state,
      product: action.payload,
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
  setProduct,
  setLoading,
  setError,
} = detailsProductSlice.actions;