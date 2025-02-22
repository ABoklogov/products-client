import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { View } from 'interfaces/View';

interface ViewState {
  value: View;
  sidebar: boolean;
  sidebarFilter: boolean;
};

const initialState: ViewState = {
  value: View.GRID,
  sidebar: false,
  sidebarFilter: false,
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
    toggleSidbarFilter: (state, action: PayloadAction<boolean>) => ({
      ...state,
      sidebarFilter: action.payload,
    }),
  },
});

export const { 
  setView, 
  toggleSidbar, 
  toggleSidbarFilter 
} = viewSlice.actions;