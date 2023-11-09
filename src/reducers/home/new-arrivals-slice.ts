
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

export const fetchNewArrivalsData = createAsyncThunk('new-arrivals-slice/fetchNewArrivalsData', async () => {
  try {
    const queryParams = {
      'consumer_key': CONSUMER_KEY,
      'consumer_secret': CONSUMER_SECRET,
      'orderby': 'date',
      'order': 'desc',
      'page':'1',
      'per_page':'8',
      'status':'publish'
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

const newArrivalsDataSlice = createSlice({
  name: 'newArrivalsData',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewArrivalsData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchNewArrivalsData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchNewArrivalsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});

export default newArrivalsDataSlice.reducer;
