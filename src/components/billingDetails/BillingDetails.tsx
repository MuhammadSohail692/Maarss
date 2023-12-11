import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Alert,
    TextInput,
    TouchableOpacity,
    useColorScheme
} from 'react-native';
import { billingDetailsType, inuputBoxContainer, userInputBox, userOrderNotesInputBox, orderNotesContainer, instructionContainer, alreadyAccountContainer, confirmCheckoutBtn } from '@theme/view'
import { $userInputContainer, $billingDetailLabel, $registerText } from '@theme/text'
import { BILLING_DETAIL_LABEL, CONFIRM_CHECKOUT, CHECK_YOUR_INTERNET, NO_INTENRT_CONNECTION,YOUR_ORDER_ID_LABEL, OK, ORDER_PLACE_SUCCESSFULLY_MESSAGE, ERROR_OCCURRED } from '@constants/app-constants'
import { LoginNavigator, DashboardNavigator } from '@constants/navigator/navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import { postOrderPlaceData } from '@reducers/orderPlace/order-place-slice';
import { putUpdateOrderData } from '@reducers/updateOrder/update-order-slice'
import { showShortToast } from '@utils/Utilities'
import { CommonActions } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import OrderPlaceDialog from '@utils/components/dialog/OrderPlaceDialog';
import { clearCartData } from '@reducers/cart/cart-slice';
import { clearProductItemsData } from '@reducers/selectedProducts/selected-products-slice';
import  AlertMessageDialog  from '@utils/components/AlertMessageDialog';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
const BillingDetails = ({ shipmentMethodValue, shipmentTypeValue, couponCode, navigation, isConfirmCheckoutSet }) => {

    
    const isDarkMode = useColorScheme() === 'dark';
    
    const textStyles = {
        color: isDarkMode ? "#111111" : "#111111",
    };
    
    const textLabelStyles = {
        color: isDarkMode ? Colors.light : Colors.dark,
    };
    const loginUserInfoScreenState = useSelector((state) => state.loginUserInfo)
    const selectedProductsScreenState = useSelector((state) => state.selectedProductsData)

    const dispatch = useDispatch();
    console.log("selectedProductsScreenState.data "+JSON.stringify(selectedProductsScreenState.data))

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('PK');
    const [city, setCity] = useState('');
    const [orderNotes, setOrderNotes] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [errorModalVisible,setErrorModalVisible] = useState(false)

    var selectedProductItems = selectedProductsScreenState.data
    //console.log("shipmentMethodValue test " + JSON.stringify(shipmentMethodValue))
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

    const openModal = (isClicked: boolean, message: string) => {
        setInfoMessage(message)
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: DashboardNavigator }],
            })
        );
    };

    
    const openErrorModal = (isClicked:boolean,message:string) => {
        setInfoMessage(message)
        setErrorModalVisible(true);
      };
    
      const closeErrorModal = () => {
        setErrorModalVisible(false);
      };
    return (
        <View style={billingDetailsType}>
            <View style={alreadyAccountContainer}>
                <Text style={[instructionContainer,textLabelStyles]}>Already have an account? </Text>
                <Text style={instructionContainer}><TouchableOpacity onPress={() => {
                    navigation.navigate(LoginNavigator);
                }}><Text style={$registerText}>Login</Text></TouchableOpacity></Text>
            </View>

            <Text style={[$billingDetailLabel,textLabelStyles]}>{BILLING_DETAIL_LABEL}</Text>

            <View style={inuputBoxContainer}>
                <TextInput
                    style={[userInputBox, $userInputContainer]}
                    placeholder="Enter Name*"
                    placeholderTextColor={textStyles.color}
                    onChangeText={(text) => setName(text)}
                >{name}</TextInput>
            </View>
            <View style={inuputBoxContainer}>
                <TextInput
                    style={[userInputBox, $userInputContainer]}
                    placeholder="Enter Email*"
                    placeholderTextColor={textStyles.color}
                    onChangeText={(text) => setEmail(text)}
                >{email}</TextInput>
            </View>
            <View style={inuputBoxContainer}>
                <TextInput
                    style={[userInputBox, $userInputContainer]}
                    placeholder="Enter Address*"
                    placeholderTextColor={textStyles.color}
                    onChangeText={(text) => setAddress(text)}
                >{address}</TextInput>
            </View>
            <View style={inuputBoxContainer}>
                <TextInput
                    style={[userInputBox, $userInputContainer]}
                    placeholder="Enter Phone*"
                    placeholderTextColor={textStyles.color}
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
                    placeholderTextColor={textStyles.color}
                    onChangeText={(text) => setCity(text)}
                >{city}</TextInput>
            </View>
            <View style={orderNotesContainer}>
                <TextInput
                    style={[userOrderNotesInputBox, $userInputContainer]}
                    placeholder="Order notes(Optional)"
                    placeholderTextColor={textStyles.color}
                    onChangeText={(text) => setOrderNotes(text)}
                    multiline={true}
                    textAlignVertical="top"
                    maxLength={100}
                />
            </View>

            <TouchableOpacity
                onPress={() => {
                    NetInfo.fetch().then((state) => {
                        if (state.isConnected) {
                            // Internet is connected, make API call
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
                                    })).then((responseOrError) => {
                                        console.log("postOrderPlaceData " + JSON.stringify(responseOrError))

                                        if (responseOrError != null && responseOrError.payload != null && responseOrError.payload.message != null && responseOrError.payload.message == "Network error") {
                                            isConfirmCheckoutSet(false); 
                                            openErrorModal(true,responseOrError.payload.message)
                                        }
                                        else if (responseOrError != null && responseOrError.payload != null && responseOrError.payload.data != null && responseOrError.payload.data.status != null) {
                                            isConfirmCheckoutSet(false);  
                                            openErrorModal(true,responseOrError.payload.message)
                                        }
                                        else {
                                            if (loginUserInfoScreenState.data != null && loginUserInfoScreenState.data.length > 0 && loginUserInfoScreenState.data[0].id != null) {
                                                if (responseOrError.payload != null && responseOrError.payload != "") {
                                                    if (responseOrError.payload.id != null && responseOrError.payload.id != "") {
                                                        console.log("putUpdateOrderData")
                                                        dispatch(putUpdateOrderData(
                                                            { customerId: loginUserInfoScreenState.data[0].id, orderId: responseOrError.payload.id,})).then((response) => {
                                                                if (response.payload != null && response.payload != "") {
                                                                    if (response.payload.id != null && response.payload.id != "") {
                                                                        dispatch(clearCartData())
                                                                        dispatch(clearProductItemsData())
                                                                        isConfirmCheckoutSet(false)
                                                                        console.log("putUpdateOrderData " + JSON.stringify(response))
                                                                        openModal(true, ORDER_PLACE_SUCCESSFULLY_MESSAGE)
                                                                    } else {
                                                                        isConfirmCheckoutSet(false)
                                                                        showShortToast(ERROR_OCCURRED)
                                                                    }
                                                                } else {
                                                                    isConfirmCheckoutSet(false)
                                                                    showShortToast(ERROR_OCCURRED)
                                                                }
                                                            });
                                                    }
                                                    else {
                                                        isConfirmCheckoutSet(false)
                                                        showShortToast(ERROR_OCCURRED)
                                                    }
                                                } else {
                                                    isConfirmCheckoutSet(false)
                                                    showShortToast(ERROR_OCCURRED)
                                                }
                                            } else {
                                                dispatch(clearCartData())
                                                dispatch(clearProductItemsData())
                                                isConfirmCheckoutSet(false)
                                                openModal(true, ORDER_PLACE_SUCCESSFULLY_MESSAGE)
                                            }

                                        }
                                    });
                            }
                        } else {
                            // No internet connection, show a popup
                            Alert.alert(
                                NO_INTENRT_CONNECTION,
                                CHECK_YOUR_INTERNET,
                                [{ text: OK, onPress: () => { } }]
                            );
                            isConfirmCheckoutSet(false); // Set loading to false so that the loader disappears
                        }
                    });
                }}
            >
                <View style={confirmCheckoutBtn}>
                    <Text
                        style={{ color: '#ffffff', fontSize: 12, fontWeight: '800', textAlign: 'center' }}>{CONFIRM_CHECKOUT}</Text>
                </View>
            </TouchableOpacity>
            <OrderPlaceDialog visible={modalVisible} closeModal={closeModal} message={infoMessage} />
            <AlertMessageDialog visible={errorModalVisible} closeModal={closeErrorModal} message={infoMessage} />

        </View>

    );
};

export default BillingDetails;