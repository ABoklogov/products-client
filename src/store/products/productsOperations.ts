import { Dispatch } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import { Product } from 'interfaces/Products.interface';
import API from "services/api";
// import { setLocalStorage } from 'helpers/setLocalStorage';
// import { getLocalStorage } from 'helpers/getLocalStorage';
import {
  setProducts,
  setLoading,
  setError,
} from './productsSlice';

export const fetchProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await API.fetchProducts();

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


// добавление события
export const deleteProduct = (id: number) => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    dispatch(setLoading(true));
    const { data } = await API.fetchProducts();

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
