/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from '@store/store';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'
import { DashboardNavigator,ProductDetailNavigator,FullScreenImageViewerNavigator,CartNavigator,ProductNavigator,FavouriteNavigator,SubCategoryNavigator,HomeTabNavigator,categoryTabNavigator,FavouriteTabNavigator ,SettingTabNavigator,RegisterNavigator,LoginNavigator,BillingInfoNavigator,SubCategoryMoreNavigator,orderHistoryNavigator} from '@constants/navigator/navigation-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '@components/bottomBar/TabBar'
import SettingScreen from '@screens/Setting/SettingScreen'
import HomeScreen from '@screens/home/HomeScreen'
import CategoryScreen from '@screens/Category/CategoryScreen'
import ProductDetailScreen from '@screens/ProductDetail/ProductDetailScreen'
import FullScreenImageView from '@screens/FullScreenImageViewerScreen/FullScreenImageView'
import FavouriteScreen from '@screens/Favourite/FavouriteScreen'
import CartScreen from '@screens/Cart/CartScreen'
import ProductScreen from '@screens/Products/ProductScreen'
import RegisterScreen from '@screens/Register/RegisterScreen'
import LoginScreen from '@screens/login/LoginScreen'
import BillingInfoScreen from '@screens/BillingInfo/BillingInfoScreen'
import OrderScreen from '@screens/Order/OrderScreen'
import SubCategoryScreen from '@screens/Category/SubCategory/SubCategoryScreen'
import SubCategoryMoreScreen from '@screens/Category/SubCategory/SubCategoryMoreScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
const persistor = persistStore(store)

function App(): JSX.Element {


  const Tab = createBottomTabNavigator();

  function HomeTabs() {
    return (
      <Tab.Navigator initialRouteName={HomeTabNavigator} tabBar={props => <TabBar {...props} />} screenOptions={{ headerShown: false }} >
        <Tab.Screen name={HomeTabNavigator} component={HomeScreen} />
        <Tab.Screen name={categoryTabNavigator} component={CategoryScreen} />
        <Tab.Screen name={CartNavigator} component={CartScreen} />
        <Tab.Screen name={FavouriteTabNavigator} component={FavouriteScreen} />
        <Tab.Screen name={SettingTabNavigator} component={SettingScreen} />
      </Tab.Navigator>
    );
  }
  // const Drawer = createDrawerNavigator(); // Create a drawer navigator
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          {/* <Drawer.Navigator >
            <Drawer.Screen name={SettingTabNavigator} component={SettingScreen} />
            <Drawer.Screen name={FavouriteNavigator} component={FavouriteScreen} />
          </Drawer.Navigator> */}

          <Stack.Navigator initialRouteName={DashboardNavigator} >
            <Stack.Screen name={DashboardNavigator} component={HomeTabs} options={{ headerShown: false }} />
            {/* <Stack.Screen name={DashboardNavigator} component={HomeScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name={SubCategoryNavigator} component={SubCategoryScreen} options={{ headerShown: false }} />
            <Stack.Screen name={SubCategoryMoreNavigator} component={SubCategoryMoreScreen} options={{ headerShown: false }} />
            <Stack.Screen name={ProductNavigator} component={ProductScreen} options={{ headerShown: false }} />
            <Stack.Screen name={ProductDetailNavigator} component={ProductDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name={FullScreenImageViewerNavigator} component={FullScreenImageView} options={{ headerShown: false }} />
            <Stack.Screen name={RegisterNavigator} component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name={LoginNavigator} component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name={BillingInfoNavigator} component={BillingInfoScreen} options={{ headerShown: false }} />
            <Stack.Screen name={orderHistoryNavigator} component={OrderScreen} options={{ headerShown: false }} />
            {/* <Stack.Screen name={FavouriteNavigator} component={FavouriteScreen} options={{ headerShown: false }} />  */}
           </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
