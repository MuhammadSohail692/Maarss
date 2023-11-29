
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, COUPON_END_POINT,CONSUMER_KEY,CONSUMER_SECRET } from '@service/constants';
import { CouponResponse } from '@types/Coupon';
import { ICouponResponse } from '@model/coupon/CouponModel';

const initialState: CouponResponse = {
  data: [],
  loading: false,
  error: "",
};

export const fetchCouponData = createAsyncThunk('coupon-slice/fetchCouponData', async ({couponCode}) => {
  try {
    console.log("couponCode " + couponCode)

    const queryParams = {
      'consumer_key': CONSUMER_KEY,
      'consumer_secret': CONSUMER_SECRET,
      'code':couponCode,
    };
    var response
    response = await axios.get(BASE_URL + COUPON_END_POINT,{
      params: queryParams,
    });

    return response.data as ICouponResponse;
  } catch (error) {
    throw error;
  }
});

const couponDataSlice = createSlice({
  name: 'couponData',
  initialState,
  reducers: {
    clearCouponData: (state) => {
        state.data = [];
        state.loading = false;
        state.error = "";
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCouponData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchCouponData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCouponData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});


export const { clearCouponData } = couponDataSlice.actions;
export default couponDataSlice.reducer;
