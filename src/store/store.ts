import { persistStore, persistReducer } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit';
import bestSellingProductReducer from '@reducers/home/best-selling-products-slice';
import newArrivalsDataReducer from '@reducers/home/new-arrivals-slice'
import productDetailScreenReducer from '@reducers/productDetail/product-detail-slice'
import favouriteReducer from '@reducers/favourite/favourite-slice'
import cartReducer from '@reducers/cart/cart-slice'
import productReducer from '@reducers/product/product-slice'
import registerReducer from '@reducers/register/register-slice'
import loginReducer from '@reducers/login/login-slice'
import shippingMethodReducer from '@reducers/shipping/shipping-slice'

import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
  bestSellingProducts: bestSellingProductReducer,
  newArrivalsData:newArrivalsDataReducer,
  productDetail:productDetailScreenReducer,
  favouriteData:favouriteReducer,
  cartData:cartReducer,
  productData: productReducer,
  registerData:registerReducer,
  loginData:loginReducer,
  shippingMethod:shippingMethodReducer
});

const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer
});

export default store;