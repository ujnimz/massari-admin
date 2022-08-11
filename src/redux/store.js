import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';

const rootReducer = combineReducers({
  userState: userReducer,
  themeState: themeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
