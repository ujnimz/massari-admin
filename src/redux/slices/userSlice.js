import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const api_root = process.env.REACT_APP_DATA_API || 'http://localhost:4000';

export const loginUser = createAsyncThunk(
  'productsList/loginUser',
  async (login, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${api_root}/api/v1/login/`, login);
      return response.data;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

const userSlice = createSlice({
  name: 'productsList',
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
    isLoading: false,
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
