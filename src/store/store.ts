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
import loginUserInfoReducer from '@reducers/loginUserInfo/login-user-Info-slice'
import categoriesDataReducer from '@reducers/categories/categories-slice'
import subCategoriesDataReducer from '@reducers/subCategories/subcategories-slice'
import subCategoriesMoreDataReducer from '@reducers/subCategories/subCategories-more-slice'
import orderHistoryDataReducer from '@reducers/orderHistory/order-history-slice'
import orderDetailDataReducer from '@reducers/orderDetail/order-detail-slice'
import couponDataReducer from '@reducers/coupon/coupon-slice'
import orderPlaceDataReducer from '@reducers/orderPlace/order-place-slice'

import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
  bestSellingProducts: bestSellingProductReducer,
  newArrivalsData: newArrivalsDataReducer,
  productDetail: productDetailScreenReducer,
  favouriteData: favouriteReducer,
  cartData: cartReducer,
  productData: productReducer,
  registerData: registerReducer,
  loginData: loginReducer,
  shippingMethod: shippingMethodReducer,
  loginUserInfo: loginUserInfoReducer,
  categoriesData: categoriesDataReducer,
  subCategoriesData: subCategoriesDataReducer,
  subCategoriesMoreData: subCategoriesMoreDataReducer,
  orderHistoryData: orderHistoryDataReducer,
  orderDetailData: orderDetailDataReducer,
  couponData: couponDataReducer,
  orderPlaceData: orderPlaceDataReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer
});

export default store;