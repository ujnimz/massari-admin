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
      let expireTime = time + 86400 * 1000;
      now.setTime(expireTime);

      // set cookie with token to get user data securely
      document.cookie = `token=${
        response.data.message.token
      }; expires=${now.toUTCString()}; path='/'`;
      // store user in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(response.data.message.user));
      // store user status in local storage
      localStorage.setItem('newUser', false);

      return response.data;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

// Register User
export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (login, {rejectWithValue}) => {
    try {
      const config = {headers: {'Content-Type': 'application/json'}};

      const response = await axios.post(`/api/v1/register`, login, config);

      // store user status in local storage
      localStorage.setItem('newUser', true);

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
      const response = await axios.get(`/api/v1/logout/`);
      // Set Expire time
      let now = new Date();
      let time = now.getTime();
      let expireTime = time + 5 * 1000;
      now.setTime(expireTime);

      // remove token cookie to log user out
      document.cookie = `token=none; expires=${now.toUTCString()}; path='/'`;
      // remove user from local storage to log user out
      localStorage.removeItem('user');

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
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
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
        state.error = null;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload.message;
        state.isLoading = false;
      })
      // Register User
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = null;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
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
        state.user = null;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
