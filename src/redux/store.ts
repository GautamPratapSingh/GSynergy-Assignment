import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import navReducer from './navSlice';
import storesReducer from './storesSlice';
import skuReducer from '../redux/skusSlice';
import planningReducer from './planningSlice';
import chartReducer from './chartSlice';



export const store = configureStore({
  reducer: {
    auth: authReducer,
    nav: navReducer,
    stores: storesReducer,
    skus: skuReducer,
    planning:planningReducer,
    chart:chartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;