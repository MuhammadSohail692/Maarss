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
import CartListing from '@components/cart/CartListing'
import { useSelector } from 'react-redux';
import { LoaderColor } from '@constants/app-constants'
import { textPrompt } from "@theme/view"
import {cartContainer} from '@theme/view'

const CartScreen = ({navigation}) => {

   
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    
    const cartScreenState = useSelector((state) => state.cartData)
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        setInitialLoading(false);
    }, []);

    if (initialLoading) {
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
                <View style={cartContainer}>
                {/* Cart Listing */}
                <CartListing cartList={cartScreenState.data ?? []} navigation={navigation}/>
                </View>
        </SafeAreaView>
    );
};

export default CartScreen;