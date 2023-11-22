
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, REGISTER_CUSTOMER_END_POINT,CONSUMER_KEY,CONSUMER_SECRET } from '@service/constants';
import { RegisterResponse } from '@types/Register';
import { IRegisterResponse } from '@model/register/RegisterModel';

const initialState: RegisterResponse = {
  data: [],
  loading: false,
  error: ""
};

export const loginData = createAsyncThunk('login-slice/loginData', async ({email,password},{ rejectWithValue }) => {
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
    response = await axios.post(BASE_URL + REGISTER_CUSTOMER_END_POINT,data,{
      params: queryParams,
    });
    return response.data as IRegisterResponse;
  } catch (error) {
return rejectWithValue(error.response?.data ?? { message: 'An error occurred' });
  }
});

const loginDataSlice = createSlice({
  name: 'loginData',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(loginData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});

export default loginDataSlice.reducer;
