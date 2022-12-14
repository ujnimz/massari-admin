import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  mode: localStorage.getItem('mode') ? localStorage.getItem('mode') : 'light',
  drawerOpen: false,
  productOpen: false,
  categoryOpen: false,
};

const themeSlice = createSlice({
  name: 'themeSwitch',
  initialState,
  reducers: {
    changeTheme: state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mode', state.mode);
    },

    switchDrawer: state => {
      state.drawerOpen = state.drawerOpen === true ? false : true;
    },
    switchProductsMenu: state => {
      state.productOpen = state.productOpen === true ? false : true;
    },
    switchCategoriesMenu: state => {
      state.categoryOpen = state.categoryOpen === true ? false : true;
    },
  },
});

export const {
  changeTheme,
  switchDrawer,
  switchProductsMenu,
  switchCategoriesMenu,
} = themeSlice.actions;
export default themeSlice.reducer;
