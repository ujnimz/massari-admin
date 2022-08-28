import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// Login User
export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (login, {rejectWithValue}) => {
    try {
      const config = {headers: {'Content-Type': 'application/json'}};

      const response = await axios.post(`/api/v1/login/`, login, config);

      let now = new Date();
      let time = now.getTime();
      let expireTime = time + 3600 * 1000;
      now.setTime(expireTime);

      document.cookie = `token=${
        response.data.message.token
      }; expires=${now.toUTCString()}; path='/'`;

      return response.data;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

// Logout User
export const logoutUser = createAsyncThunk(
  'users/logoutUser',
  async (login, {rejectWithValue}) => {
    try {
      const response = await axios.post(`/api/v1/logout/`);

      return response.data;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

export const getUser = createAsyncThunk(
  'users/getUser',
  async (args, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          withCredentials: true,
        },
      };

      const response = await axios.get(`/api/v1/me/`, config);
      return response.data;
    } catch ({response}) {
      return console.log(response);
    }
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    userToken: document.cookie,
    error: null,
    isLoading: false,
  },
  extraReducers: builder => {
    builder
      // Login User
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.message;
        state.userToken = action.payload.message.token;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload.message;
        state.isLoading = false;
      })
      // Logout User
      .addCase(logoutUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.userToken = null;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload.message;
        state.isLoading = false;
      })
      // Get User
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload.message;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
