import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

// GET THE ORDERS
export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (args, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          withCredentials: true,
        },
      };

      const response = await axios.get(`/api/v1/admin/orders/`, config);

      return response.data.orders;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

// GET A ORDER
export const getOrder = createAsyncThunk(
  'orders/getOrder',
  async (args, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          withCredentials: true,
        },
      };

      const response = await axios.get(`/api/v1/admin/order/${args}`, config);

      return response.data.order;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

// UPDATE A ORDER
export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async (args, {rejectWithValue}) => {
    try {
      const {orderId, orderData} = args;

      const config = {
        headers: {
          withCredentials: true,
        },
      };
      console.log(orderData);
      const {data} = await axios.put(
        `/api/v1/admin/order/${orderId}`,
        orderData,
        config,
      );

      // Show Notification
      toast.success('The order has been updated successfully.');

      // Scroll to window top after saving
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return data.order;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

// DELETE A ORDER
export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (args, {rejectWithValue}) => {
    try {
      const {orderId} = args;

      const config = {
        headers: {
          withCredentials: true,
        },
      };

      const {data} = await axios.delete(
        `/api/v1/admin/order/${orderId}`,
        config,
      );

      // Show Notification
      toast.success('The order has been deleted successfully.');

      return data.order;
    } catch ({response}) {
      return rejectWithValue({code: response.status, ...response.data});
    }
  },
);

const initialState = {
  orders: null,
  order: null,
  error: null,
  isLoading: false,
  isSaving: false,
  isDeleting: false,
};
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderState() {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: builder => {
    builder
      // GET ALL ORDERS
      .addCase(getOrders.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.orders = null;
        state.error = action.payload;
        state.isLoading = false;
      })
      // GET AN ORDER
      .addCase(getOrder.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.orders = null;
        state.error = action.payload;
        state.isLoading = false;
      })
      // UPDATE AN ORDER
      .addCase(updateOrder.pending, (state, action) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.error = null;
        state.isSaving = false;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.orders = null;
        state.error = action.payload;
        state.isSaving = false;
      })
      // DELETE AN ORDER
      .addCase(deleteOrder.pending, (state, action) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.order = null;
        state.error = null;
        state.isDeleting = false;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.isDeleting = false;
      });
  },
});
export const {resetOrderState} = orderSlice.actions;
export default orderSlice.reducer;
