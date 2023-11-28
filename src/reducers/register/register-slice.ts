
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

export const registerData = createAsyncThunk('register-slice/registerData', async ({email,password},{ rejectWithValue }) => {
  try {
    const queryParams = {
      'consumer_key': CONSUMER_KEY,
      'consumer_secret': CONSUMER_SECRET,
    };
    const data = {
        email: email,
        password: password,
      };
      
    var response
    response = await axios.post(BASE_URL + USER_INFO_REGISTER_CUSTOMER_END_POINT,data,{
      params: queryParams,
    });
    return response.data as IRegisterResponse;
  } catch (error) {
    return rejectWithValue(error.response?.data ?? { message: error.message === 'Network Error'? "Network error": 'An error occurred' });
  }
});

const registerDataSlice = createSlice({
  name: 'registerData',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(registerData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(registerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});

export default registerDataSlice.reducer;
