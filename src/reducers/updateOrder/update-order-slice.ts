
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, ORDER_HISTORY_END_POINT,CONSUMER_KEY,CONSUMER_SECRET } from '@service/constants';
import { PlaceOrderResponse } from '@types/PlaceOrder';
import { IPlaceOrderModelResponse } from '@model/placeOrder/PlaceOrderModel';

const initialState: PlaceOrderResponse = {
  data: {},
  loading: false,
  error: "",
};

export const putUpdateOrderData = createAsyncThunk('update-order-slice/putUpdateOrderData', async ({customerId,orderId,}) => {
  try {
    console.log("orderId " + orderId)
    console.log("customerId "+customerId)
       
     const  queryParams = {
        'consumer_key': CONSUMER_KEY,
        'consumer_secret': CONSUMER_SECRET,
        'customer_id': customerId
      };

    
    var response
    response = await axios.put(BASE_URL + ORDER_HISTORY_END_POINT+"/"+orderId,{},{
      params: queryParams,
    });

    return response.data as IPlaceOrderModelResponse;
  } catch (error) {
    throw error;
  }
});

const updateOrderDataSlice = createSlice({
  name: 'updateOrderData',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(putUpdateOrderData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(putUpdateOrderData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(putUpdateOrderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});
export default updateOrderDataSlice.reducer;
