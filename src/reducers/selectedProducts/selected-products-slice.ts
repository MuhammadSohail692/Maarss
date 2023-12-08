
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SelectedProductRespose } from '@types/SelectedProducts';
import { ISelectedProductRespose } from '@model/selectedProducts/SelectedProductModel';

const initialState: SelectedProductRespose = {
  data: [],
  loading: false,
  error: ""
};

export const fetchSelectedProductsData = createAsyncThunk('selected-products-slice/fetchSelectedProductsData', async ({productItems}) => {
  try {
    return productItems as ISelectedProductRespose;
  } catch (error) {
    throw error;
  }
});

const selectedProductsDataSlice = createSlice({
  name: 'selectedProductsData',
  initialState,
  reducers: {
    clearProductItemsData: (state) => {
      state.data = [];
      state.loading = false;
      state.error = "";
    },

    removeProductsInfoById: (state, action) => {
      const { productId } = action.payload;

      const productIndex = state.data.findIndex(product => product.product_id === productId);

      if (productIndex !== -1) {
        state.data.splice(productIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelectedProductsData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchSelectedProductsData.fulfilled, (state, action) => {
        // state.data = action.payload;
        state.data = state.data.concat(action.payload);
        state.loading = false;
      })
      .addCase(fetchSelectedProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});

export const { clearProductItemsData,removeProductsInfoById } = selectedProductsDataSlice.actions;
export default selectedProductsDataSlice.reducer;