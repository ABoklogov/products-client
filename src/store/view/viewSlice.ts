import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { View } from 'interfaces/View';

interface ViewState {
  value: View;
  sidebar: boolean;
};

const initialState: ViewState = {
  value: View.GRID,
  sidebar: false,
};

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<View>) => ({
      ...state,
      value: action.payload,
    }),
    toggleSidbar: (state, action: PayloadAction<boolean>) => ({
      ...state,
      sidebar: action.payload,
    }),
  },
});

export const { setView, toggleSidbar } = viewSlice.actions;