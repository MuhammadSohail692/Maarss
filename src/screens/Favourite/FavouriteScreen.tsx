import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    useColorScheme,
    View,
    ActivityIndicator,
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import FavouriteListing from '@components/favourite/FavouriteListing'
import { useSelector, useDispatch } from 'react-redux';
import { LoaderColor } from '@constants/app-constants'
import { textPrompt } from "@theme/view"
import {favouriteContainer} from '@theme/view'

const FavouriteScreen = ({navigation}) => {

   
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    
    const favouriteScreenState = useSelector((state) => state.favouriteData)
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        setInitialLoading(false);
    }, []);

    if (initialLoading) {
        // Show the initial loader in the center
        return (
            <View style={[textPrompt, { height: 260 }]}>
                <ActivityIndicator size="large" color={LoaderColor} />
            </View>
        );
    }

    return (
        <SafeAreaView style={backgroundStyle} >
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
                <View style={favouriteContainer}>
                {/* Favourite Listing */}
                <FavouriteListing isDarkMode={isDarkMode} favouriteList={favouriteScreenState.data ?? []} navigation={navigation}/>
                </View>
        </SafeAreaView>
    );
};

export default FavouriteScreen;