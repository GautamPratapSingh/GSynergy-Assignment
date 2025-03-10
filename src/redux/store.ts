import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import navReducer from './navSlice';
import storesReducer from './storesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    nav: navReducer,
    stores: storesReducer, // Add stores here!
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;