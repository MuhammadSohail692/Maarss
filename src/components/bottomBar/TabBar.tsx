import React from 'react'; 

import {View, Pressable, Dimensions, StyleSheet,Image,Text} from 'react-native'
import {mainBottomContainer,mainItemContainer,bottomBarPressView} from '@theme/view'

import {$bottomNavFocuesLabel,$bottomNavLabel} from '@theme/text'

import icNavSetting from '@assets/images/ic_nav_settings.png'
import icFav from '@assets/images/ic_nav_favourite.png'
import icNavHome from '@assets/images/ic_nav_home.png'

const tabItems = [
    { label: 'Home', imageSource: icNavHome},
    { label: 'Favourite', imageSource: icFav },
    { label: 'Setting', imageSource: icNavSetting },
  ];

const TabBar = ({ state, descriptors, navigation}: any) =>{
  return (
    <View style={mainBottomContainer}>
      {state.routes.map((route: any , index: number) => {
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
          <View key = {index} style = {[mainItemContainer]}>
            <Pressable
              onPress = {onPress}>
              <View style = {bottomBarPressView}>
                <Image source={tabItem.imageSource} style={isFocused ? styles.iconTint:styles.icon} />
                <Text style={isFocused ? $bottomNavFocuesLabel :$bottomNavLabel}>{tabItem.label}</Text>
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
        tintColor:'#000000'
      }
  });
  

export default TabBar; 