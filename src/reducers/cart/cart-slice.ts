
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductDetailRespose } from '@types/ProductDetail';
import { IProductDetailRespose } from '@model/productDetail/ProductDetailModel';

const initialState: ProductDetailRespose = {
  data: [],
  loading: false,
  error: ""
};

export const fetchCartData = createAsyncThunk('cart-slice/fetchCartData', async ({cartItem}) => {
  try {
    return cartItem as IProductDetailRespose;
  } catch (error) {
    throw error;
  }
});

const cartDataSlice = createSlice({
  name: 'cartData',
  initialState,
  reducers: {
    clearCartData: (state) => {
      state.data = [];
      state.loading = false;
      state.error = "";
    },
    updateCartItemQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;
       const itemIndex = state.data.findIndex(item => item.id === productId);

       if (itemIndex !== -1) {
         // Create a new copy of the item with the updated stock_quantity
         const updatedItem = {
           ...state.data[itemIndex],
           stock_quantity: newQuantity
         };
 
         // Create a new array and update the item at the specific index
         const newData = [...state.data];
         newData[itemIndex] = updatedItem;
 
         // Update the state with the new array
         state.data = newData;
        } 
    },
    removeCartItemById: (state, action) => {
      const { productId } = action.payload;

      const productIndex = state.data.findIndex(product => product.id === productId);

      if (productIndex !== -1) {
        state.data.splice(productIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.data = state.data.concat(action.payload);
        state.loading = false;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unable to server at the moment";
      });
  },
});


export const { clearCartData,updateCartItemQuantity,removeCartItemById } = cartDataSlice.actions;
export default cartDataSlice.reducer;