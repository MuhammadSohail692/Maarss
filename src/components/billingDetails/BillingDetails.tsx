import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { billingDetailsType, inuputBoxContainer, userInputBox, orderNotesContainer, instructionContainer, alreadyAccountContainer, confirmCheckoutBtn } from '@theme/view'
import { $userInputContainer, $billingDetailLabel, $registerText } from '@theme/text'
import { BILLING_DETAIL_LABEL, CONFIRM_CHECKOUT } from '@constants/app-constants'
import { LoginNavigator } from '@constants/navigator/navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import { postOrderPlaceData } from '@reducers/orderPlace/order-place-slice';
import { showShortToast } from '@utils/Utilities'

const BillingDetails = ({shipmentTypeValue, couponValue,navigation,isConfirmCheckoutSet }) => {

    const loginUserInfoScreenState = useSelector((state) => state.loginUserInfo)
    const selectedProductsScreenState = useSelector((state) => state.selectedProductsData)
    const orderPlaceScreenState = useSelector((state) => state.orderPlaceData)
    // const loginInfoScreenState = useSelector((state) => state.loginData)
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('PK');
    const [city, setCity] = useState('');
    const [orderNotes, setOrderNotes] = useState('');

    var selectedProductItems = selectedProductsScreenState.data
    console.log("producst info "+selectedProductsScreenState.data)
    // console.log("token "+loginInfoScreenState.data.token)
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
                        style={[userInputBox, $userInputContainer]}
                        placeholder="Order notes(Optional)"
                        onChangeText={(text) => setOrderNotes(text)}
                        multiline={true}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => {
                        isConfirmCheckoutSet(true)
                        dispatch(postOrderPlaceData(
    { paymentMethod: "",paymentMethodTitle:"",name:name,address:address,city:city,country:country,email:email,phone:phone,
    customerNote:orderNotes,couponCode:couponValue,shippingLine:shipmentTypeValue,selectedProductItems:selectedProductItems})).then(() => {
                            showShortToast("Order place successfully.")
                            isConfirmCheckoutSet(false)
                        });
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