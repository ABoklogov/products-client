import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { productsSlice } from './products/productsSlice';
import { viewSlice } from './view/viewSlice';

export const store = configureStore({
  reducer: {
    [productsSlice.name]: productsSlice.reducer,
    [viewSlice.name]: viewSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;