
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, ORDER_HISTORY_END_POINT,CONSUMER_KEY,CONSUMER_SECRET } from '@service/constants';
import { OrderDetailResponse } from '@types/OrderDetail';
import { IOrderDetailResponse } from '@model/orderDetail/OrderDetailModel';

const initialState: OrderDetailResponse = {
  data: {},
  loading: false,
  error: "",
};

export const fetchOrderDetailData = createAsyncThunk('order-detail-slice/fetchOrderDetailData', async ({orderId,}) => {
  try {
    console.log("orderId " + orderId)
       
     const  queryParams = {
        'consumer_key': CONSUMER_KEY,
        'consumer_secret': CONSUMER_SECRET,
      };

    
    var response
    response = await axios.get(BASE_URL + ORDER_HISTORY_END_POINT+"/"+orderId,{
      params: queryParams,
    });

    return response.data as IOrderDetailResponse;
  } catch (error) {
    throw error;
  }
});

const orderDetailDataSlice = createSlice({
  name: 'orderDetailData',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetailData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchOrderDetailData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrderDetailData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});
export default orderDetailDataSlice.reducer;
