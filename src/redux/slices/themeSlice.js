import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
  drawerOpen: false,
};

const themeSlice = createSlice({
  name: 'themeSwitch',
  initialState,
  reducers: {
    changeTheme: state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    switchDrawer: state => {
      state.drawerOpen = state.drawerOpen === true ? false : true;
    },
  },
});

export const {changeTheme, switchDrawer} = themeSlice.actions;
export default themeSlice.reducer;
