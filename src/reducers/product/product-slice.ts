
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

export const fetchProductData = createAsyncThunk('product-slice/fetchProductData', async ({categoryId}) => {
  try {
    const queryParams = {
      'consumer_key': CONSUMER_KEY,
      'consumer_secret': CONSUMER_SECRET,
      'category':categoryId,
      'orderby': 'date',
      'order': 'desc',
      'page':'1',
      'per_page':'20',
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

const productDataSlice = createSlice({
  name: 'productData',
  initialState,
  reducers: {
    clearProductData: (state) => {
      state.data = [];
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.data = state.data.concat(action.payload);
        state.loading = false;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});


export const { clearProductData } = productDataSlice.actions;
export default productDataSlice.reducer;