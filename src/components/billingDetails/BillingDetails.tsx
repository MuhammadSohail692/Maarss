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

const BillingDetails = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('Pakistan');
    const [city, setCity] = useState('');
    const [orderNotes, setOrderNotes] = useState('');


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
                            />
                        </View>
                        <View style={inuputBoxContainer}>
                            <TextInput
                                style={[userInputBox, $userInputContainer]}
                                placeholder="Enter Email*"
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
                        <View style={inuputBoxContainer}>
                            <TextInput
                                style={[userInputBox, $userInputContainer]}
                                placeholder="Enter Address*"
                                onChangeText={(text) => setAddress(text)}
                            />
                        </View>
                        <View style={inuputBoxContainer}>
                            <TextInput
                                style={[userInputBox, $userInputContainer]}
                                placeholder="Enter Phone*"
                                onChangeText={(text) => setPhone(text)}
                            />
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
                            />
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