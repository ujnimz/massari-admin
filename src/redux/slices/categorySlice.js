import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

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

      const response = await axios.get(
        `/api/v1/products/category/${args}`,
        config,
      );

      return response.data.product;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

// Add A CATEGORY
export const addCategory = createAsyncThunk(
  'products/addProduct',
  async (args, {rejectWithValue}) => {
    try {
      const {categoryData} = args;

      const config = {
        headers: {
          withCredentials: true,
        },
      };

      const {data} = await axios.post(
        `/api/v1/admin/product/categories/new`,
        categoryData,
        config,
      );

      // Show Notification
      toast.success('The category has been added successfully.');

      // Scroll to window top after saving
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return data.category;
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
      const {categoryId, categoryData} = args;

      const config = {
        headers: {
          withCredentials: true,
        },
      };

      const {data} = await axios.put(
        `/api/v1/admin/products/category/${categoryId}`,
        categoryData,
        config,
      );

      // Show Notification
      toast.success('The category has been updated successfully.');

      return data.category;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

// DELETE A CATEGORY
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (args, {rejectWithValue}) => {
    try {
      const {categoryId} = args;

      const config = {
        headers: {
          withCredentials: true,
        },
      };

      const {data} = await axios.delete(
        `/api/v1/admin/products/category/${categoryId}`,
        config,
      );

      // Show Notification
      if (data.success) {
        return toast.success('The category has been deleted successfully.');
      }

      return toast.error(data.message);
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

const initialState = {
  allCategories: null,
  category: null,
  error: null,
  isLoading: false,
  isSaving: false,
  isDeleting: false,
};
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetCategoryState() {
      return {
        ...initialState,
      };
    },
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
      // ADD A CATEGORY
      .addCase(addCategory.pending, (state, action) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.error = null;
        state.isSaving = false;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.category = null;
        state.error = action.payload;
        state.isSaving = false;
      })
      // UPDATE A CATEGORY
      .addCase(updateCategory.pending, (state, action) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.error = null;
        state.isSaving = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.category = null;
        state.error = action.payload;
        state.isSaving = false;
      })
      // DELETE A CATEGORY
      .addCase(deleteCategory.pending, (state, action) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.error = null;
        state.isDeleting = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.category = null;
        state.error = action.payload;
        state.isDeleting = false;
      });
  },
});
export const {resetCategoryState, resetSuccess} = categorySlice.actions;
export default categorySlice.reducer;
