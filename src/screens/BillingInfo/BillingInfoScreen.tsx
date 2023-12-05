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
import { useSelector, useDispatch } from 'react-redux';
import {  LoaderColor } from '@constants/app-constants'
import { textPrompt } from "@theme/view"
import ShippingType from '@components/shippingType/ShippingType'
import BillingDetails from '@components/billingDetails/BillingDetails'
import Coupon from '@components/Coupon/Coupon'
import { billingInfoContainer } from "@theme/view"
import BlurLoader from '@utils/components/loader/BlurLoader'

const BillingInfoScreen = ({route,navigation}) => {

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    
    const [initialLoading, setInitialLoading] = useState(false);
    const dispatch = useDispatch();

    const [couponValue, setCouponValue] = useState("");
    const [isCouponValue, isCouponValueSet] = useState(false);
    const [isConfirmCheckout, isConfirmCheckoutSet] = useState(false);
    const [shipmentTypeValue, setShipmentTypeValue] = useState("");
    const [shipmentMethodValue,setShipmentMethodValue] =useState("")
    const [couponCode, setCouponCode] = useState("");



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
            <BlurLoader loading={isCouponValue} />
            <BlurLoader loading={isConfirmCheckout}/>

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}
                style={[backgroundStyle]}>
                <View style={billingInfoContainer}>

                {/* Coupon */}
                <Coupon couponCode={couponCode} setCouponCode={setCouponCode} couponValue={couponValue} setCouponValue={setCouponValue} isCouponValueSet={isCouponValueSet}/>

                {/* Shipping type */}
                <ShippingType setShipmentMethodValue={setShipmentMethodValue} setShipmentTypeValue={setShipmentTypeValue} couponValue={couponValue} navigation={navigation}/>

                {/* {Billing Details} */}
                <BillingDetails shipmentMethodValue={shipmentMethodValue} shipmentTypeValue={shipmentTypeValue} couponCode={couponCode} navigation={navigation}  isConfirmCheckoutSet={isConfirmCheckoutSet}/>
                
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default BillingInfoScreen;