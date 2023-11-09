
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductDetailRespose } from '@types/ProductDetail';
import { IProductDetailRespose } from '@model/productDetail/ProductDetailModel';

const initialState: ProductDetailRespose = {
  data: [],
  loading: false,
  error: ""
};

export const fetchfavouriteData = createAsyncThunk('favourite-slice/fetchfavouriteData', async ({favoriteItem}) => {
  try {
    return favoriteItem as IProductDetailRespose;
  } catch (error) {
    throw error;
  }
});

const favouriteDataSlice = createSlice({
  name: 'favouriteData',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchfavouriteData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchfavouriteData.fulfilled, (state, action) => {
        state.data = state.data.concat(action.payload);
        state.loading = false;
      })
      .addCase(fetchfavouriteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});

export default favouriteDataSlice.reducer;
