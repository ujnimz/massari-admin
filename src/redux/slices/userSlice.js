import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

// LOGIN A USER
export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (login, {rejectWithValue}) => {
    try {
      const config = {headers: {'Content-Type': 'application/json'}};

      const response = await axios.post(`/api/v1/login/`, login, config);

      let now = new Date();
      let time = now.getTime();
      let expireTime = time + 5 * 1000;
      now.setTime(expireTime);

      // set cookie with token to get user data securely
      // document.cookie = `token=${
      //   response.data.message.token
      // }; expires=${now.toUTCString()}; path='/'`;
      // store user in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(response.data.message.user));
      // store user status in local storage
      localStorage.setItem('isAuth', response.data.success);

      return response.data;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

// REGISTER A USER
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

// LOGOUT THE USER
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

// GET THE USER DATA
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

      return response.data.user;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

// AUTHENTICATE THE USER
export const authUser = createAsyncThunk(
  'users/authUser',
  async (args, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          withCredentials: true,
        },
      };

      const response = await axios.get(`/api/v1/me/`, config);

      localStorage.setItem('isAuth', response.data.success);
      // Show Notification
      //toast.success('User has been authenticated.');
      return response.data.user;
    } catch ({response}) {
      localStorage.setItem('isAuth', false);
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

// UPDATE THE USER
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (login, {rejectWithValue}) => {
    try {
      let newData = null;
      if (login.avatar.public_id !== '') {
        newData = {
          name: login.name,
          email: login.email,
          avatar: '',
        };
      } else {
        newData = {
          name: login.name,
          email: login.email,
          avatar: login.avatar.url,
        };
      }

      const config = {
        headers: {'Content-Type': 'application/json', withCredentials: true},
      };

      const response = await axios.put(`/api/v1/me/update`, newData, config);
      // Show Notification
      toast.success('Profile has been updated.');
      return response.data;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    isAuth: localStorage.getItem('isAuth') === 'true',
    user: JSON.parse(localStorage.getItem('user')),
    error: null,
    isLoading: false,
  },
  extraReducers: builder => {
    builder
      // LOGIN A USER
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      // REGISTER A USER
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      // LOGOUT THE USER
      .addCase(logoutUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuth = false;
        state.user = null;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      // GET THE USER DATA
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuth = false;
        state.error = null;
        state.user = null;
        state.isLoading = false;
      })
      // AUTHENTICATE THE USER
      .addCase(authUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isAuth = false;
        state.user = null;
        state.error = null;
        state.isLoading = false;
      })
      // Update A USER
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
