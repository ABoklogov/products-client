import { Dispatch } from '@reduxjs/toolkit';
import { setLocalStorage } from 'helpers/setLocalStorage';
import { getLocalStorage } from 'helpers/getLocalStorage';
import { setView } from './viewSlice';
import { View } from 'interfaces/View';
import { Sort, SortOptions } from 'interfaces/Products.interface';
import { setSort } from 'store/products/productsSlice';

const KEY_VIEW = 'view';
const KEY_SORT = 'sort';

export const calcView = () => async (dispatch: Dispatch) => {
  const localView = getLocalStorage<View>(KEY_VIEW);

  if (localView === null) {
    setLocalStorage(View.LIST, KEY_VIEW);
    dispatch(setView(View.LIST));
  } else {
    dispatch(setView(localView));
  };
};

export const changeView = (view: View) => async (dispatch: Dispatch) => {
  setLocalStorage(view, KEY_VIEW);
  dispatch(setView(view));
};


export const calcSort = () => async (dispatch: Dispatch) => {
  const localSort = getLocalStorage<SortOptions>(KEY_SORT);

  if (!localSort) return;
  dispatch(setSort(localSort));
};

export const changeSort = (sort: SortOptions) => async (dispatch: Dispatch) => {
  setLocalStorage(sort, KEY_SORT);
  dispatch(setSort(sort));
};