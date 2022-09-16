import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

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

      // Show Notification
      toast.success('The product has been updated successfully.');

      // Scroll to window top after saving
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return data.product;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

// Add A PRODUCT
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (args, {rejectWithValue}) => {
    try {
      const {productData} = args;

      const config = {
        headers: {
          withCredentials: true,
        },
      };

      const {data} = await axios.post(
        `/api/v1/admin/product/new`,
        productData,
        config,
      );

      // Show Notification
      toast.success('The product has been added successfully.');

      // Scroll to window top after saving
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return data.product;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

// DELETE A PRODUCT
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (args, {rejectWithValue}) => {
    try {
      const {productId} = args;

      const config = {
        headers: {
          withCredentials: true,
        },
      };

      const {data} = await axios.delete(
        `/api/v1/admin/product/${productId}`,
        config,
      );

      // Show Notification
      toast.success('The product has been deleted successfully.');

      return data.product;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

const initialState = {
  products: null,
  product: null,
  success: false,
  error: null,
  isLoading: false,
  isSaving: false,
  isDeleting: false,
};
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProductState() {
      return {
        ...initialState,
      };
    },
    resetSuccess(state) {
      return {
        ...state,
        success: false,
      };
    },
  },
  extraReducers: builder => {
    builder
      // GET THE PRODUCTS
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.success = true;
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
        state.success = true;
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
        state.isSaving = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.success = true;
        state.product = action.payload;
        state.error = null;
        state.isSaving = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.products = null;
        state.error = action.payload;
        state.isSaving = false;
      })
      // ADD A PRODUCTS
      .addCase(addProduct.pending, (state, action) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.success = true;
        state.product = action.payload;
        state.error = null;
        state.isSaving = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.product = null;
        state.error = action.payload;
        state.isSaving = false;
      })
      // DELETE A PRODUCTS
      .addCase(deleteProduct.pending, (state, action) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.success = true;
        state.product = null;
        state.error = null;
        state.isDeleting = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.isDeleting = false;
      });
  },
});
export const {resetProductState, resetSuccess} = productSlice.actions;
export default productSlice.reducer;
