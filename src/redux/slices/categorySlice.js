import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
//import {toast} from 'react-toastify';

// GET ALL THE CATEGORIES
export const getAllCategories = createAsyncThunk(
  'categories/getAllCategories',
  async (args, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          withCredentials: true,
        },
      };

      const response = await axios.get(
        `/api/v1/admin/products/categories/`,
        config,
      );

      return response.data.categories;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

// GET A CATEGORY
export const getCategory = createAsyncThunk(
  'categories/getCategory',
  async (args, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          withCredentials: true,
        },
      };

      const response = await axios.get(`/api/v1/product/${args}`, config);

      return response.data.product;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

// UPDATE A CATEGORY
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (args, {rejectWithValue}) => {
    try {
      const {productId, productData} = args;

      const config = {
        headers: {
          withCredentials: true,
        },
      };

      const {data} = await axios.put(
        `/api/v1/admin/product/${productId}`,
        productData,
        config,
      );
      return data.product;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    allCategories: null,
    category: null,
    error: null,
    isLoading: true,
  },
  extraReducers: builder => {
    builder
      // GET ALL THE CATEGORIES
      .addCase(getAllCategories.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.allCategories = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.allCategories = null;
        state.error = action.payload;
        state.isLoading = false;
      })
      // GET A CATEGORY
      .addCase(getCategory.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.category = null;
        state.error = action.payload;
        state.isLoading = false;
      })
      // UPDATE A CATEGORY
      .addCase(updateCategory.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.category = null;
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default categorySlice.reducer;
