import { Dispatch } from '@reduxjs/toolkit';
import { setLocalStorage } from 'helpers/setLocalStorage';
import { getLocalStorage } from 'helpers/getLocalStorage';
import { setView } from './viewSlice';
import { View } from 'interfaces/View';

const KEY_VIEW = 'view';

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