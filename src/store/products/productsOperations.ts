import { Dispatch } from '@reduxjs/toolkit';
import type { RootState } from 'store';
import API from "services/api";
import {
  setProducts,
  setLoading,
  setError,
  setSort,
} from './productsSlice';
import { getUrlParameter } from 'helpers/getUrlParameter';
import { Sort, SortOptions } from 'interfaces/Products.interface';
import { setUrlParameter } from 'helpers/setUrlParameter';
import { SORT_OPTIONS } from 'constants/sort';

const KEY_SORT = 'sort';

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

export const calcSort = () => async (dispatch: Dispatch) => {
  const sort: any = getUrlParameter(KEY_SORT);

  if (!sort) return;
  const sortOption = SORT_OPTIONS.find(el => el.code === sort);
  if (sortOption) dispatch(setSort(sortOption));
};

export const changeSort = (sort: SortOptions) => async (dispatch: Dispatch) => {
  setUrlParameter(KEY_SORT, sort.code);
  dispatch(setSort(sort));
};