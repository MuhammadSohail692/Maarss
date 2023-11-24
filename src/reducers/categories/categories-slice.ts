
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, CATEGORIES_END_POINT,CONSUMER_KEY,CONSUMER_SECRET } from '@service/constants';
import { CategoriesResponse } from '@types/Categories';
import { ICategoriesResponse } from '@model/categories/CategoriesModel';

const initialState: CategoriesResponse = {
  data: [],
  loading: false,
  error: "",
  pageData:[]
};

export const fetchCategoriesData = createAsyncThunk('categories-slice/fetchCategoriesData', async ({categoryId,pageNo}) => {
  try {
    console.log("categoryId " + categoryId)
    console.log("page " + pageNo)

    const queryParams = {
      'consumer_key': CONSUMER_KEY,
      'consumer_secret': CONSUMER_SECRET,
      'parent':categoryId,
      'page':pageNo,
      'per_page':'20',
    };
    var response
    response = await axios.get(BASE_URL + CATEGORIES_END_POINT,{
      params: queryParams,
    });

    return response.data as ICategoriesResponse;
  } catch (error) {
    throw error;
  }
});

const categoriesDataSlice = createSlice({
  name: 'categoriesData',
  initialState,
  reducers: {
    clearCategoryData: (state) => {
        state.data = [];
        state.loading = false;
        state.error = "";
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchCategoriesData.fulfilled, (state, action) => {
        state.pageData = action.payload;

        state.data = state.data.concat(action.payload);
        state.loading = false;
      })
      .addCase(fetchCategoriesData.rejected, (state, action) => {
        console.log("errore "+action.error.message)

        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});


export const { clearCategoryData } = categoriesDataSlice.actions;
export default categoriesDataSlice.reducer;
