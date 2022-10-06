import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import orderReducer from './slices/orderSlice';

const rootReducer = combineReducers({
  userState: userReducer,
  themeState: themeReducer,
  productState: productReducer,
  categoryState: categoryReducer,
  orderState: orderReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
