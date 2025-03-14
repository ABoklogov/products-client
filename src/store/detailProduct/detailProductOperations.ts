import { setError, setLoading, setProduct } from "./detailProductSlice";
import API from "services/api";
import { Dispatch } from '@reduxjs/toolkit';

export const fetchProduct = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await API.fetchProduct(id);

    if (data === undefined) {
      throw new Error('Server Error!');
    } else {
      dispatch(setLoading(false));
      dispatch(setError(''));
      dispatch(setProduct(data));
    };
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    };
  };
};

export const deletePicture = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await API.deletePicture(id);

    if (data === undefined) {
      throw new Error('Server Error!');
    } else {
      dispatch(setLoading(false));
      dispatch(setError(''));
      dispatch(setProduct(data));
    };
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    };
  };
};

export const updatePicture = (id: number, formData: FormData) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await API.updatePicture(id, formData);

    if (data === undefined) {
      throw new Error('Server Error!');
    } else {
      dispatch(setLoading(false));
      dispatch(setError(''));
      dispatch(setProduct(data));
    };
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    };
  };
};