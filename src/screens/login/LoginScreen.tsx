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
    Linking
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { registerContainer, inuputBoxContainer, userInputBox, settingHeaderContainer, registerFildsContainer, registrationLoginBtn, registrationLoginContainer, instructionContainer } from "@theme/view"
import { $labelContainer, $userInputContainer, $contactUsHeaderContainer, $privacyPolicyText, $registerText } from '@theme/text'
import { LOGIN_SCREEN_LABEL, LOGIN_LABEL, PRIVACY_POLICY_URL } from '@constants/app-constants'
import icEmail from '@assets/images/ic_email.png'
import icPassword from '@assets/images/ic_password.png'
import { ISettingUrl } from '@types/type'
import { useSelector, useDispatch } from 'react-redux';
import { loginData } from '@reducers/login/login-slice';
import { showShortToast } from '@utils/Utilities'
import Loader from '@utils/components/loader/Loader'
import { RegisterNavigator,BillingInfoNavigator } from '@constants/navigator/navigation-stack';

const LoginScreen = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const registerScreenState = useSelector((state) => state.registerData)
    const [initialLoading, setInitialLoading] = useState(false);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('dawd333d@gmail.com');
    const [password, setPassword] = useState('test123');


    const loginButtonClick = () => {
        console.log('Password:', password);
        console.log('Email:', email);

        if (email.length == 0) {
            showShortToast("Email field is required")
        }
        else if (password.length == 0) {
            showShortToast("Password field is required")
        }
        else {
            setInitialLoading(true);
            dispatch(loginData({ email: "dawd333d@gmail.com", password: "test123" })).then((responseOrError) => {

                const response = responseOrError;

                if (response != null && response.payload != null && response.payload.data != null && response.payload.data.status != null && response.payload.data.status == 400) {
                    console.log("status", response.payload.data.status);
                    console.log("Message", response.payload.message);
                    showShortToast(response.payload.message)
                    setInitialLoading(false);
                } else {
                    setInitialLoading(false);
                    showShortToast("User Login")
                    navigation.goBack();
                    navigation.navigate(BillingInfoNavigator);

                    console.log('Login successful:', responseOrError);
                }
            }).catch((error) => {
                // Handle the error here
                console.error('Registration error:', error);
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
                        <Text style={$contactUsHeaderContainer}>{LOGIN_SCREEN_LABEL}</Text>
                    </View>

                    <View style={registerFildsContainer}>
                        <View style={inuputBoxContainer}>
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

                        <View style={inuputBoxContainer}>
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
                        <TouchableOpacity
                            onPress={() => {
                                loginButtonClick()
                            }}
                        >
                            <View style={registrationLoginContainer}>
                                <Text
                                    style={[{ color: '#ffffff', fontSize: 12, fontWeight: '800', textAlign: 'center' }, registrationLoginBtn]}>{LOGIN_LABEL}</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={registrationLoginContainer}>
                            <Text style={instructionContainer}>Don't have your account? </Text>
                            <Text style={instructionContainer}><TouchableOpacity onPress={() => {
                                navigation.navigate(RegisterNavigator);
                            }}><Text style={$registerText}>Register</Text></TouchableOpacity></Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;