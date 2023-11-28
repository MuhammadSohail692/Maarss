
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, LOGIN_CUSTOMER_END_POINT } from '@service/constants';
import { LoginResponse } from '@types/Login';
import { ILoginResponse } from '@model/login/LoginModel';

const initialState: LoginResponse = {
  data: {},
  loading: false,
  error: ""
};

export const loginData = createAsyncThunk('login-slice/loginData', async ({email,password},{ rejectWithValue }) => {
  try {
  
    const data = {
        username: email,
        password: password,
      };
      
    var response
    response = await axios.post(BASE_URL + LOGIN_CUSTOMER_END_POINT,data);
    return response.data as ILoginResponse;
  } catch (error) {
return rejectWithValue(error.response?.data ?? { message: error.message === 'Network Error'? "Network error": 'An error occurred' });
  }
});

const loginDataSlice = createSlice({
  name: 'loginData',
  initialState,
  reducers: {
    clearUserLoginData: (state) => {
      state.data = [];
      state.loading = false;
      state.error = "";
    },
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


export const { clearUserLoginData } = loginDataSlice.actions;
export default loginDataSlice.reducer;