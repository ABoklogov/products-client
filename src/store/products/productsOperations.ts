import { Dispatch } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import API from "services/api";
import {
  setProducts,
  setLoading,
  setError,
} from './productsSlice';

export const fetchProducts = () => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const { products } = getState();
  try {
    dispatch(setLoading(true));
    const { data } = await API.fetchProducts(products.sort?.code ?? undefined);

    if (data === undefined) {
      throw new Error('Server Error!');
    } else {
      dispatch(setLoading(false));
      dispatch(setError(''));
      dispatch(setProducts(data));
    };
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    };
  };
};

export const deleteProduct = (id: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    dispatch(setLoading(true));
    const res = await API.deleteProduct(id);

    if (!res) {
      throw new Error('Server Error!');
    } else {
      dispatch(setLoading(false));
      dispatch(setError(''));
      return res
    };
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    };
  };
};
