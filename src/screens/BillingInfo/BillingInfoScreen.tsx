import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    useColorScheme,
    View,
    ActivityIndicator,
    Alert
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import ImageSlider from '@components/imageSlider/ImageSlider'
import ProductDescription from '@components/productDescription/ProductDescription'
import { useSelector, useDispatch } from 'react-redux';
import {  NO_INTENRT_CONNECTION, CHECK_YOUR_INTERNET, OK,LoaderColor } from '@constants/app-constants'
import NetInfo from '@react-native-community/netinfo';
import { textPrompt } from "@theme/view"
import { fetchProductDetailData } from '@reducers/productDetail/product-detail-slice';
import ShippingType from '@components/shippingType/ShippingType'
import BillingDetails from '@components/billingDetails/BillingDetails'
import { billingInfoContainer } from "@theme/view"

const BillingInfoScreen = ({route,navigation}) => {

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    
    const productDetailScreenState = useSelector((state) => state.productDetail)
    const [initialLoading, setInitialLoading] = useState(false);
    const dispatch = useDispatch();

    // const { productId } = route.params; 


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

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}
                style={[backgroundStyle]}>
                <View style={billingInfoContainer}>

                {/* Shipping type */}
                <ShippingType navigation={navigation}/>

                {/* {Billing Details} */}
                <BillingDetails navigation={navigation}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default BillingInfoScreen;