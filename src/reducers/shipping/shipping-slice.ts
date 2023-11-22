
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, COUNTRY_END_POINT,CONSUMER_KEY,CONSUMER_SECRET } from '@service/constants';
import { ShippingResponse } from '@types/Shipping';
import { IShippingResponse } from '@model/shipping/ShippingModel';

const initialState: ShippingResponse = {
  data: [],
  loading: false,
  error: ""
};

export const fetchShippingMethodData = createAsyncThunk('shipping-slice/fetchShippingMethodData', async ({countryId}) => {
  try {
    const queryParams = {
      'consumer_key': CONSUMER_KEY,
      'consumer_secret': CONSUMER_SECRET,
    };
    var response
    response = await axios.get(BASE_URL + COUNTRY_END_POINT+"/"+countryId+"/methods",{
      params: queryParams,
    });

    return response.data as IShippingResponse;
  } catch (error) {
    throw error;
  }
});

const shippingMethodDataSlice = createSlice({
  name: 'shippingMethod',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShippingMethodData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchShippingMethodData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchShippingMethodData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});

export default shippingMethodDataSlice.reducer;
