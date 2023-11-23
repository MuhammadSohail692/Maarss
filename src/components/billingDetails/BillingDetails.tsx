import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import HTML from 'react-native-render-html';
import { billingDetailsType, inuputBoxContainer,userInputBox, orderNotesContainer, instructionContainer,alreadyAccountContainer } from '@theme/view'
import { productDescViewRowContainer, productNameViewRowContainer, productQuantityContainer, plusMinusContainer, quantityConatiner, billingInfoContainer } from "@theme/view"
import { $userInputContainer, $billingDetailLabel, $registerText, $productLabelValues, $plusMinusLabel, $quantityContainer } from '@theme/text'
import { IProductColors, IProductDetailColors, IProductDetailSize } from '@types/type';
import { fetchfavouriteData } from '@reducers/favourite/favourite-slice'
import { fetchCartData } from '@reducers/cart/cart-slice'
import icFavourite from '@assets/images/ic_favourite.png'
import { SUBTOTAL_LABEL, BILLING_DETAIL_LABEL, TOTAL_LABEL, DELIVERY_LABEL } from '@constants/app-constants'
import { LoginNavigator } from '@constants/navigator/navigation-stack';
import { useSelector } from 'react-redux';

const BillingDetails = ({ navigation }) => {

    const loginUserInfoScreenState = useSelector((state) => state.loginUserInfo)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('Pakistan');
    const [city, setCity] = useState('');
    const [orderNotes, setOrderNotes] = useState('');
    
    useEffect(() => {

        if(loginUserInfoScreenState.data!=null && loginUserInfoScreenState.data.length>0){
        setName(loginUserInfoScreenState.data[0].username ? loginUserInfoScreenState.data[0].username:"")
        setEmail(loginUserInfoScreenState.data[0].email ? loginUserInfoScreenState.data[0].email:"")
        setAddress(loginUserInfoScreenState.data[0].shipping.address_1 ? loginUserInfoScreenState.data[0].shipping.address_1:"")
        setCity(loginUserInfoScreenState.data[0].shipping.city ? loginUserInfoScreenState.data[0].shipping.city:"")
        setCountry(loginUserInfoScreenState.data[0].shipping.country ? loginUserInfoScreenState.data[0].shipping.country:"")
        setPhone(loginUserInfoScreenState.data[0].shipping.phone ? loginUserInfoScreenState.data[0].shipping.phone:"")

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
            </View>

        </View>


    );
};

export default BillingDetails;