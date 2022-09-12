import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
//import {toast} from 'react-toastify';

// GET THE PRODUCTS
export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (args, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          withCredentials: true,
        },
      };

      const response = await axios.get(`/api/v1/products/`, config);

      return response.data.products;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

// GET A PRODUCT
export const getProduct = createAsyncThunk(
  'products/getProduct',
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

// UPDATE A PRODUCT
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
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

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: null,
    product: null,
    error: null,
    isLoading: false,
  },
  extraReducers: builder => {
    builder
      // GET THE PRODUCTS
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.products = null;
        state.error = action.payload;
        state.isLoading = false;
      })
      // GET A PRODUCTS
      .addCase(getProduct.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.products = null;
        state.error = action.payload;
        state.isLoading = false;
      })
      // UPDATE A PRODUCTS
      .addCase(updateProduct.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.products = null;
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export default productSlice.reducer;
