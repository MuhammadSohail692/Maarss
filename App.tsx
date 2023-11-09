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
import { DashboardNavigator,ProductDetailNavigator,FullScreenImageViewerNavigator,FavouriteNavigator,HomeTabNavigator,FavouriteTabNavigator ,SettingTabNavigator} from '@constants/navigator/navigation-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '@components/bottomBar/TabBar'
import SettingScreen from '@screens/Setting/SettingScreen'
import HomeScreen from '@screens/home/HomeScreen'
import ProductDetailScreen from '@screens/ProductDetail/ProductDetailScreen'
import FullScreenImageView from '@screens/FullScreenImageViewerScreen/FullScreenImageView'
import FavouriteScreen from '@screens/Favourite/FavouriteScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';


const persistor = persistStore(store)


function App(): JSX.Element {


  const Tab = createBottomTabNavigator();

  function HomeTabs() {
    return (
      <Tab.Navigator initialRouteName={HomeTabNavigator} tabBar={props => <TabBar {...props} />} screenOptions={{ headerShown: false }} >
        <Tab.Screen name={HomeTabNavigator} component={HomeScreen} />
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
            <Stack.Screen name={ProductDetailNavigator} component={ProductDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name={FullScreenImageViewerNavigator} component={FullScreenImageView} options={{ headerShown: false }} />
            {/* <Stack.Screen name={FavouriteNavigator} component={FavouriteScreen} options={{ headerShown: false }} />  */}
           </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
