
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, ORDER_HISTORY_END_POINT,CONSUMER_KEY,CONSUMER_SECRET } from '@service/constants';
import { OrderResponse } from '@types/Order';
import { IOrderResponse } from '@model/order/OrderModel';

const initialState: OrderResponse = {
  data: [],
  loading: false,
  error: "",
  pageData:[]
};

export const fetchOrderHistoryData = createAsyncThunk('order-history-slice/fetchOrderHistoryData', async ({customerId,pageNo,status}) => {
  try {
    console.log("customer " + customerId)

    var queryParams = {}
    if(status=="all"){
       queryParams = {
        'consumer_key': CONSUMER_KEY,
        'consumer_secret': CONSUMER_SECRET,
        'customer': customerId,
        'page':pageNo,
        'per_page':'20',
      };
    }else{
       queryParams = {
        'consumer_key': CONSUMER_KEY,
        'consumer_secret': CONSUMER_SECRET,
        'customer': customerId,
        'page':pageNo,
        'per_page':'20',
        'status': status,
      };
    }
  
    var response
    response = await axios.get(BASE_URL + ORDER_HISTORY_END_POINT,{
      params: queryParams,
    });

    return response.data as IOrderResponse;
  } catch (error) {
    throw error;
  }
});

const orderHistoryDataDataSlice = createSlice({
  name: 'orderHistoryData',
  initialState,
  reducers: {
    clearOrderHistoryData: (state) => {
        state.loading = false;
        state.error = "";
        state.data = [];
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistoryData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchOrderHistoryData.fulfilled, (state, action) => {
        state.pageData = action.payload;
        state.data = state.data.concat(action.payload);
        state.loading = false;
      })
      .addCase(fetchOrderHistoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});

export const { clearOrderHistoryData } = orderHistoryDataDataSlice.actions;
export default orderHistoryDataDataSlice.reducer;