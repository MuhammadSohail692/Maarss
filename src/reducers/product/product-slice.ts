
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, PRODUCT_END_POINT,CONSUMER_KEY,CONSUMER_SECRET } from '@service/constants';
import { ProductResponse } from '@types/Products';
import { IProductsModelResponse } from '@model/products/ProductsModel';

const initialState: ProductResponse = {
  data: [],
  loading: false,
  error: "",
  pageData:[]
};

export const fetchProductData = createAsyncThunk('product-slice/fetchProductData', async ({categoryId,pageNo,selectedOrderBy,order,searchText}) => {
  try {
    console.log("orderby " + selectedOrderBy)
    console.log("order " + order)
    console.log("page " + pageNo)
    console.log("searchText " + searchText)

    var queryParams = {}
    if(searchText.length>0){
       queryParams = {
        'consumer_key': CONSUMER_KEY,
        'consumer_secret': CONSUMER_SECRET,
        'orderby': selectedOrderBy,
        'order': order,
        'page':pageNo,
        'per_page':'20',
        'stock_status':'instock',
        'search':searchText
      };
    }else{
      queryParams = {
        'consumer_key': CONSUMER_KEY,
        'consumer_secret': CONSUMER_SECRET,
        'category':categoryId,
        'orderby': selectedOrderBy,
        'order': order,
        'page':pageNo,
        'per_page':'20',
        'stock_status':'instock'
      };
    }
    
    var response
    response = await axios.get(BASE_URL + PRODUCT_END_POINT,{
      params: queryParams,
    });

    return response.data as IProductsModelResponse;
  } catch (error) {
    throw error;
  }
});

const productDataSlice = createSlice({
  name: 'productData',
  initialState,
  reducers: {
    clearProductData: (state) => {
      state.data = [];
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.pageData = action.payload;
        state.data = state.data.concat(action.payload);
        state.loading = false;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});


export const { clearProductData } = productDataSlice.actions;
export default productDataSlice.reducer;