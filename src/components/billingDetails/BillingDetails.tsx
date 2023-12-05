import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { billingDetailsType, inuputBoxContainer, userInputBox, userOrderNotesInputBox, orderNotesContainer, instructionContainer, alreadyAccountContainer, confirmCheckoutBtn } from '@theme/view'
import { $userInputContainer, $billingDetailLabel, $registerText } from '@theme/text'
import { BILLING_DETAIL_LABEL, CONFIRM_CHECKOUT } from '@constants/app-constants'
import { LoginNavigator, DashboardNavigator } from '@constants/navigator/navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import { postOrderPlaceData } from '@reducers/orderPlace/order-place-slice';
import { putUpdateOrderData } from '@reducers/updateOrder/update-order-slice'
import { showShortToast } from '@utils/Utilities'
import { CommonActions } from '@react-navigation/native';

const BillingDetails = ({ shipmentMethodValue, shipmentTypeValue, couponCode, navigation, isConfirmCheckoutSet }) => {

    const loginUserInfoScreenState = useSelector((state) => state.loginUserInfo)
    const selectedProductsScreenState = useSelector((state) => state.selectedProductsData)

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('PK');
    const [city, setCity] = useState('');
    const [orderNotes, setOrderNotes] = useState('');

    var selectedProductItems = selectedProductsScreenState.data
    console.log("shipmentMethodValue test " + JSON.stringify(shipmentMethodValue))
    useEffect(() => {
        if (loginUserInfoScreenState.data != null && loginUserInfoScreenState.data.length > 0) {
            setName(loginUserInfoScreenState.data[0].username ? loginUserInfoScreenState.data[0].username : "")
            setEmail(loginUserInfoScreenState.data[0].email ? loginUserInfoScreenState.data[0].email : "")
            setAddress(loginUserInfoScreenState.data[0].shipping.address_1 ? loginUserInfoScreenState.data[0].shipping.address_1 : "")
            setCity(loginUserInfoScreenState.data[0].shipping.city ? loginUserInfoScreenState.data[0].shipping.city : "")
            // setCountry(loginUserInfoScreenState.data[0].shipping.country ? loginUserInfoScreenState.data[0].shipping.country : "")
            setPhone(loginUserInfoScreenState.data[0].shipping.phone ? loginUserInfoScreenState.data[0].shipping.phone : "")
        }
    }, [loginUserInfoScreenState]);

    return (
        <View>
            <View style={billingDetailsType}>
                <View style={alreadyAccountContainer}>
                    <Text style={instructionContainer}>Already have an account? </Text>
                    <Text style={instructionContainer}><TouchableOpacity onPress={() => {
                        navigation.navigate(LoginNavigator);
                    }}><Text style={$registerText}>Login</Text></TouchableOpacity></Text>
                </View>

                <Text style={[$billingDetailLabel]}>{BILLING_DETAIL_LABEL}</Text>

                <View style={inuputBoxContainer}>
                    <TextInput
                        style={[userInputBox, $userInputContainer]}
                        placeholder="Enter Name*"
                        onChangeText={(text) => setName(text)}
                    >{name}</TextInput>
                </View>
                <View style={inuputBoxContainer}>
                    <TextInput
                        style={[userInputBox, $userInputContainer]}
                        placeholder="Enter Email*"
                        onChangeText={(text) => setEmail(text)}
                    >{email}</TextInput>
                </View>
                <View style={inuputBoxContainer}>
                    <TextInput
                        style={[userInputBox, $userInputContainer]}
                        placeholder="Enter Address*"
                        onChangeText={(text) => setAddress(text)}
                    >{address}</TextInput>
                </View>
                <View style={inuputBoxContainer}>
                    <TextInput
                        style={[userInputBox, $userInputContainer]}
                        placeholder="Enter Phone*"
                        onChangeText={(text) => setPhone(text)}
                        keyboardType={'numeric'}
                    >{phone}</TextInput>
                </View>
                {/* <View style={inuputBoxContainer}>
                            <TextInput
                                style={[userInputBox, $userInputContainer]}
                                placeholder="Pakistan*"
                                editable={false}
                            />
                        </View> */}
                <View style={inuputBoxContainer}>
                    <TextInput
                        style={[userInputBox, $userInputContainer]}
                        placeholder="Enter City*"
                        onChangeText={(text) => setCity(text)}
                    >{city}</TextInput>
                </View>
                <View style={orderNotesContainer}>
                    <TextInput
                        style={[userOrderNotesInputBox, $userInputContainer]}
                        placeholder="Order notes(Optional)"
                        onChangeText={(text) => setOrderNotes(text)}
                        multiline={true}
                        textAlignVertical="top"
                        maxLength={100}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => {
                        if (name.length == 0) {
                            showShortToast("Name is required.")
                        }
                        else if (email.length == 0) {
                            showShortToast("Email is required.")
                        }
                        else if (address.length == 0) {
                            showShortToast("Address is required.")
                        }
                        else if (phone.length == 0) {
                            showShortToast("Phone is required.")
                        }
                        else if (city.length == 0) {
                            showShortToast("City is required.")
                        } else {
                            isConfirmCheckoutSet(true)
                            dispatch(postOrderPlaceData(
                                {
                                    paymentMethod: shipmentMethodValue.payment_method, paymentMethodTitle: shipmentMethodValue.payment_method_title, name: name,
                                    address: address, city: city, country: country, email: email, phone: phone,
                                    customerNote: orderNotes, couponCode: couponCode, shippingLine: shipmentTypeValue, selectedProductItems: selectedProductItems
                                })).then((response) => {
                                    console.log("postOrderPlaceData " + JSON.stringify(response))

                                    if (loginUserInfoScreenState.data != null && loginUserInfoScreenState.data.length > 0 && loginUserInfoScreenState.data[0].id != null) {
                                        if (response.payload != null && response.payload != "") {
                                            if (response.payload.id != null && response.payload.id != "") {
                                                dispatch(putUpdateOrderData(
                                                    {
                                                        customerId: loginUserInfoScreenState.data[0].id, orderId: response.payload.id,
                                                    })).then((response) => {
                                                        if (response.payload != null && response.payload != "") {
                                                            if (response.payload.id != null && response.payload.id != "") {
                                                                isConfirmCheckoutSet(false)
                                                                console.log("putUpdateOrderData " + JSON.stringify(response))
                                                                showShortToast("Order place successfully.")
                                                                navigation.dispatch(
                                                                    CommonActions.reset({
                                                                        index: 0,
                                                                        routes: [{ name: DashboardNavigator }],
                                                                    })
                                                                );
                                                            } else {
                                                                isConfirmCheckoutSet(false)
                                                                showShortToast("An error occurred while place an order")
                                                            }
                                                        } else {
                                                            isConfirmCheckoutSet(false)
                                                            showShortToast("An error occurred while place an order")
                                                        }
                                                    });
                                            }
                                            else {
                                                isConfirmCheckoutSet(false)
                                                showShortToast("An error occurred while place an order")
                                            }
                                        } else {
                                            isConfirmCheckoutSet(false)
                                            showShortToast("An error occurred while place an order")
                                        }
                                    } else {
                                        isConfirmCheckoutSet(false)
                                        showShortToast("Order place successfully.")
                                        navigation.dispatch(
                                            CommonActions.reset({
                                                index: 0,
                                                routes: [{ name: DashboardNavigator }],
                                            })
                                        );
                                    }
                                });
                        }
                    }}
                >
                    <View style={confirmCheckoutBtn}>
                        <Text
                            style={{ color: '#ffffff', fontSize: 12, fontWeight: '800', textAlign: 'center' }}>{CONFIRM_CHECKOUT}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>


    );
};

export default BillingDetails;