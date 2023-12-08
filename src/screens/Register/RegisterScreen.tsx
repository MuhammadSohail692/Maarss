import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    useColorScheme,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    Linking,
    Alert
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { registerContainer, inuputBoxLoginRegisterContainer, userInputBox, settingHeaderContainer, registerFildsContainer, registrationLoginBtn, registrationLoginContainer, instructionContainer } from "@theme/view"
import { $labelContainer, $userInputContainer, $contactUsHeaderContainer, $privacyPolicyText } from '@theme/text'
import { REGISTRATION_LABEL, REGISTER_LABEL, PRIVACY_POLICY_URL,NO_INTENRT_CONNECTION,CHECK_YOUR_INTERNET,OK } from '@constants/app-constants'
import icEmail from '@assets/images/ic_email.png'
import icPassword from '@assets/images/ic_password.png'
import { ISettingUrl } from '@types/type'
import { useSelector, useDispatch } from 'react-redux';
import { registerData } from '@reducers/register/register-slice';
import { showShortToast } from '@utils/Utilities'
import Loader from '@utils/components/loader/Loader'
import { BillingInfoNavigator } from '@constants/navigator/navigation-stack';
import  AlertMessageDialog  from '@utils/components/AlertMessageDialog';
import NetInfo from '@react-native-community/netinfo';

const RegisterScreen = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const textStyles = {
        color: isDarkMode ? Colors.light : Colors.dark,
    };
    const [initialLoading, setInitialLoading] = useState(false);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = (isClicked:boolean,message:string) => {
        setInfoMessage(message)
        setModalVisible(true);
      };
    
      const closeModal = () => {
        setModalVisible(false);
      };

    const handlePrivacyPolicyPress = () => {
        Linking.openURL(PRIVACY_POLICY_URL);
    };

    const registerButtonClick = () => {

        if (email.length == 0) {
            showShortToast("Email field is required")
        }
        else if (password.length == 0) {
            showShortToast("Password field is required")
        }
        else {

            NetInfo.fetch().then((state) => {
                if (state.isConnected) {
                    // Internet is connected, make API call
                    setInitialLoading(true);
                    dispatch(registerData({ email: email, password: password })).then((responseOrError) => {
        
                        const response = responseOrError;
        
                        
                        if (response != null && response.payload != null && response.payload.message != null && response.payload.message =="Network error") 
                          {
                            console.log("Message", response.payload.message);
                            openModal(true,response.payload.message)
                            setInitialLoading(false);
        
                         }
                       else if (response != null && response.payload != null && response.payload.data != null && response.payload.data.status != null && response.payload.data.status == 400) {
                            console.log("status", response.payload.data.status);
                            console.log("Message", response.payload.message);
                            openModal(true,response.payload.message)
                            setInitialLoading(false);
                        } else {
                            setInitialLoading(false);
                            showShortToast("User register")
        
                            console.log('Registration successful:', responseOrError);
                            navigation.goBack();
                        }
                    }).catch((error) => {
                        console.error('Registration error:', error);
                        setInitialLoading(false);
                        showShortToast("Failed to register user")
                    });
                } else {
                    // No internet connection, show a popup
                    Alert.alert(
                        NO_INTENRT_CONNECTION,
                        CHECK_YOUR_INTERNET,
                        [{ text: OK, onPress: () => console.log('OK Pressed') }]
                    );
                    setInitialLoading(false);
                }
            });
        }
    };

    return (
        <SafeAreaView style={backgroundStyle} >
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <Loader loading={initialLoading} />

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}
                style={[backgroundStyle]}>

                <View style={registerContainer}>
                    <View style={settingHeaderContainer}>
                        <Text style={[$contactUsHeaderContainer,textStyles]}>{REGISTRATION_LABEL}</Text>
                    </View>

                    <View style={registerFildsContainer}>
                        <View style={inuputBoxLoginRegisterContainer}>
                            <Image
                                source={icEmail}
                                style={{
                                    width: 18,
                                    height: 18,
                                }}
                            />
                            <TextInput
                                style={[userInputBox, $userInputContainer]}
                                placeholder="Email Address"
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>

                        <View style={inuputBoxLoginRegisterContainer}>
                            <Image
                                source={icPassword}
                                style={{
                                    width: 18,
                                    height: 18,
                                }}
                            />
                            <TextInput
                                style={[userInputBox, $userInputContainer]}
                                placeholder="Password"
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={true} // This hides the entered text for a password field
                            />
                        </View>

                        <Text style={instructionContainer}>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{' '}<TouchableOpacity onPress={handlePrivacyPolicyPress}><Text style={$privacyPolicyText}>privacy policy</Text></TouchableOpacity>.</Text>
                        <TouchableOpacity
                            onPress={() => {
                                registerButtonClick()
                            }}
                        >
                            <View style={registrationLoginContainer}>
                                <Text
                                    style={[{ color: '#ffffff', fontSize: 12, fontWeight: '800', textAlign: 'center' }, registrationLoginBtn]}>{REGISTER_LABEL}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <AlertMessageDialog visible={modalVisible} closeModal={closeModal} message={infoMessage} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RegisterScreen;