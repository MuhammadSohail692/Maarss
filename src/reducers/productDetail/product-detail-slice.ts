
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, PRODUCT_END_POINT,CONSUMER_KEY,CONSUMER_SECRET } from '@service/constants';
import { ProductDetailRespose } from '@types/ProductDetail';
import { IProductDetailRespose } from '@model/productDetail/ProductDetailModel';

const initialState: ProductDetailRespose = {
  data: [],
  loading: false,
  error: ""
};

export const fetchProductDetailData = createAsyncThunk('product-detail-slice/fetchProductDetailData', async ({productsId}) => {
  try {
    const queryParams = {
      'consumer_key': CONSUMER_KEY,
      'consumer_secret': CONSUMER_SECRET,
    };
    var response
    response = await axios.get(BASE_URL + PRODUCT_END_POINT+"/"+productsId,{
      params: queryParams,
    });

    return response.data as IProductDetailRespose;
  } catch (error) {
    throw error;
  }
});

const productDetailDataSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetailData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchProductDetailData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductDetailData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});

export default productDetailDataSlice.reducer;
