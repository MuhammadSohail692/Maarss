
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, PRODUCT_END_POINT,CONSUMER_KEY,CONSUMER_SECRET } from '@service/constants';
import { BestSellingProductRespose } from '@types/BestSellingPrice';
import { IBestSellingProductRespose } from '@model/home/bestSellingProductModel/BestSellingProductModel';

const initialState: BestSellingProductRespose = {
  data: [],
  loading: false,
  error: ""
};

export const fetchBestSellingProductsData = createAsyncThunk('best-selling-products-slice/fetchBestSellingProductsData', async () => {
  try {
    const queryParams = {
      'consumer_key': CONSUMER_KEY,
      'consumer_secret': CONSUMER_SECRET,
      'orderby': 'popularity',
      'order': 'desc',
      'page':'1',
      'per_page':'8'
    };
    var response
    response = await axios.get(BASE_URL + PRODUCT_END_POINT,{
      params: queryParams,
    });

    return response.data as IBestSellingProductRespose;
  } catch (error) {
    throw error;
  }
});

const bestSellingProductsSlice = createSlice({
  name: 'bestSellingProducts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBestSellingProductsData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchBestSellingProductsData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchBestSellingProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});

export default bestSellingProductsSlice.reducer;
