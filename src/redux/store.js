import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

import themeReducer from './slices/themeSlice';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';

const rootReducer = combineReducers({
  userState: userReducer,
  themeState: themeReducer,
  productState: productReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
