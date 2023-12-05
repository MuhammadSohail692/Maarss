import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import { userInputCouponBox, searchInuputCouponContainer, applyCouponBtn } from '@theme/view'
import { $userInputContainer } from '@theme/text'
import { NO_COUPON_FOUND_LABEL,NO_INTENRT_CONNECTION,CHECK_YOUR_INTERNET,OK } from '@constants/app-constants'
import { IShippingResponse } from '@model/shipping/ShippingModel';
import { fetchShippingMethodData } from '@reducers/shipping/shipping-slice';
import { IBestSellingProductRespose } from '@model/home/bestSellingProductModel/BestSellingProductModel';
import { useSelector, useDispatch } from 'react-redux';
import { showShortToast } from '@utils/Utilities'
import { clearCouponData, fetchCouponData } from '@reducers/coupon/coupon-slice'
import NetInfo from '@react-native-community/netinfo';

const Coupon = ({couponCode,setCouponCode,  couponValue, setCouponValue,isCouponValueSet }) => {

    const [searchCoupon, setSearchCoupon] = useState("");
    const dispatch = useDispatch();

    const handleApplyCoupon = () => {
        NetInfo.fetch().then((state) => {
            if (state.isConnected) {
                if (searchCoupon.length > 0) {
                    isCouponValueSet(true)
                    dispatch(clearCouponData());
                    dispatch(fetchCouponData({ couponCode: searchCoupon })).then((response) => {
                        isCouponValueSet(false)
                        if (response.payload != null && response.payload.length > 0) {
                            setCouponCode(searchCoupon)
                            setCouponValue(response.payload);
                        } else {
                            showShortToast(NO_COUPON_FOUND_LABEL)
                        }
                    }).catch((error) => {
                        showShortToast("Failed to apply coupon.")
                    });
                }else{
                    showShortToast("Coupon field is required.")
                }
            } else {
                // No internet connection, show a popup
                Alert.alert(
                    NO_INTENRT_CONNECTION,
                    CHECK_YOUR_INTERNET,
                    [{ text: OK, onPress: () => console.log('OK Pressed') }]
                );
            }
        });
    };

    return (
        <View>

            <View style={searchInuputCouponContainer}>
                <TextInput
                    style={[userInputCouponBox, $userInputContainer]}
                    placeholder="Coupon code"
                    onChangeText={(text) => setSearchCoupon(text)}
                    value={searchCoupon}
                />
                <TouchableOpacity
                    onPress={handleApplyCoupon}
                >
                    <View style={applyCouponBtn}>
                        <Text
                            style={{ color: '#ffffff', fontSize: 12, fontWeight: '500', textAlign: 'center' }}>Apply Coupon</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default Coupon;