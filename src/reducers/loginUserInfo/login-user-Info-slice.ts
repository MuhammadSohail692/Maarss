
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, USER_INFO_REGISTER_CUSTOMER_END_POINT,CONSUMER_KEY,CONSUMER_SECRET } from '@service/constants';
import { RegisterResponse } from '@types/Register';
import { IRegisterResponse } from '@model/register/RegisterModel';

const initialState: RegisterResponse = {
  data: [],
  loading: false,
  error: ""
};

export const fetchLoginUserInfoData = createAsyncThunk('login-user-Info-slice/fetchLoginUserInfoData', async ({email}) => {
  try {
    const queryParams = {
      'consumer_key': CONSUMER_KEY,
      'consumer_secret': CONSUMER_SECRET,
      'email':email
    };
    var response
    response = await axios.get(BASE_URL + USER_INFO_REGISTER_CUSTOMER_END_POINT,{
      params: queryParams,
    });

    return response.data as IRegisterResponse;
  } catch (error) {
    throw error;
  }
});

const loginUserInfoDataSlice = createSlice({
  name: 'loginUserInfo',
  initialState,
  reducers: {
    clearUserInfoData: (state) => {
      state.data = [];
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUserInfoData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchLoginUserInfoData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchLoginUserInfoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});

export const { clearUserInfoData } = loginUserInfoDataSlice.actions;
export default loginUserInfoDataSlice.reducer;
