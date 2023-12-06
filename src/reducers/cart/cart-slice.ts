
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductDetailRespose } from '@types/ProductDetail';
import { IProductDetailRespose } from '@model/productDetail/ProductDetailModel';

const initialState: ProductDetailRespose = {
  data: [],
  loading: false,
  error: ""
};

export const fetchCartData = createAsyncThunk('cart-slice/fetchCartData', async ({cartItem}) => {
  try {
    return cartItem as IProductDetailRespose;
  } catch (error) {
    throw error;
  }
});

const cartDataSlice = createSlice({
  name: 'cartData',
  initialState,
  reducers: {
    clearCartData: (state) => {
      state.data = [];
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.data = state.data.concat(action.payload);
        state.loading = false;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});


export const { clearCartData } = cartDataSlice.actions;
export default cartDataSlice.reducer;