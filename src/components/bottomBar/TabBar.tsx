import React from 'react';

import { View, Pressable, Dimensions, StyleSheet, Image, Text, useColorScheme } from 'react-native'
import { mainBottomContainer, mainItemContainer, bottomBarPressView, cartCountContainer, cartCountIsFocusedContainer } from '@theme/view'
import { useSelector } from 'react-redux';
import { $bottomNavFocuesLabel, $bottomNavLabel, $cartCountText } from '@theme/text'
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import icNavHome from '@assets/images/ic_nav_home.png'
import icNavCategory from '@assets/images/ic_nav_category.png'
import icCart from '@assets/images/ic_nav_cart.png'
import icFav from '@assets/images/ic_nav_favourite.png'
import icNavSetting from '@assets/images/ic_nav_settings.png'

const tabItems = [
  { label: 'Home', imageSource: icNavHome },
  { label: 'Category', imageSource: icNavCategory },
  { label: 'Cart', imageSource: icCart },
  { label: 'Favourite', imageSource: icFav },
  { label: 'Setting', imageSource: icNavSetting },
];

const TabBar = ({ state, descriptors, navigation }: any) => {
  const cartScreenState = useSelector((state) => state.cartData)

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textStyles = {
    color: isDarkMode ? Colors.light : Colors.dark,
  };
  return (
    <View style={[mainBottomContainer, backgroundStyle]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        const tabItem = tabItems[index];

        return (
          <View key={index} style={[mainItemContainer]}>
            <Pressable
              onPress={onPress}>
              <View style={bottomBarPressView}>
                <Image source={tabItem.imageSource} style={[isFocused ? {
                  width: 20,
                  height: 20,
                  tintColor: "#745D8A"
                } : {
                  width: 20,
                  height: 20,
                  tintColor: textStyles.color
                } ]} />
                {tabItem.label === 'Cart' && cartScreenState.data.length > 0 && (
                  <View style={isFocused ? cartCountIsFocusedContainer : cartCountContainer}>
                    <Text style={$cartCountText}>{cartScreenState.data.length}</Text>
                  </View>
                )}
                <Text style={[isFocused ? 
                {
                  fontSize: 11,
                  marginTop: 4,
                  color: '#745D8A',
                  fontWeight: '700'
                } : {
                  fontSize: 11,
                  marginTop: 4,
                  color: textStyles.color,
                  fontWeight: '700'
                }]}>{tabItem.label}</Text>
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({

  icon: {
    width: 20,
    height: 20,
  },
  iconTint: {
    width: 20,
    height: 20,
    tintColor: '#745D8A'
  }
});


export default TabBar; 