import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    useColorScheme,
    ScrollView,
    TouchableOpacity,
    Image,
    Linking
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { settingContainer, forwardContainer, settingItemContainer, settingHeaderContainer, socialIconContainer, instagramIconContainer } from "@theme/view"
import { $labelContainer, $followUsContainer, $contactUsHeaderContainer } from '@theme/text'
import { PRIVACY_POLICY_LABEL, CONTACT_US_LABEL, TERMS_AND_CONDITION_LABEL, SETTING_LABEL, CUSTOMER_HELP_LABEL, FOLLOW_US_LABEL, INSTAGRAM_URL, FACEBOOK_URL, CUSTOMER_HELP_URL, TERMS_AND_CONDITION_URL, PRIVACY_POLICY_URL, CONTACT_US_URL, ORDER_HISTORY_LABEL, LOGOUT_LABEL } from '@constants/app-constants'
import icForward from '@assets/images/ic_forward.png'
import icFacebook from '@assets/images/ic_facebook.png'
import icInstagram from '@assets/images/ic_instagram.png'
import { ISettingUrl } from '@types/type'
import { orderHistoryNavigator ,DashboardNavigator} from '@constants/navigator/navigation-stack';
import { useSelector,useDispatch } from 'react-redux';
import {  clearUserLoginData } from '@reducers/login/login-slice';
import {  clearUserInfoData } from '@reducers/loginUserInfo/login-user-Info-slice';
import { CommonActions } from '@react-navigation/native';

const SettingScreen = ({ navigation }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const dispatch = useDispatch();
    const loginScreenState = useSelector((state) => state.loginData)


    const openLink = (url: string) => {

        Linking.openURL(url)
            .then((supported) => {
                if (!supported) {
                    console.error("Can't handle url: " + url);
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };
    const handleLinkPress = (url: string) => {
        openLink(url);
    };

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

                <View style={settingContainer}>
                    <View style={settingHeaderContainer}>
                        <Text style={$contactUsHeaderContainer}>{SETTING_LABEL}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        handleLinkPress(CONTACT_US_URL)

                    }}>
                        <View style={settingItemContainer}>
                            <Text style={$labelContainer}>{CONTACT_US_LABEL}</Text>
                            <View style={forwardContainer}>
                                <Image source={icForward} style={{ width: 13, height: 13, resizeMode: 'contain', tintColor: 'white' }} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        handleLinkPress(PRIVACY_POLICY_URL)
                    }}>
                        <View style={settingItemContainer}>
                            <Text style={$labelContainer}>{PRIVACY_POLICY_LABEL}</Text>
                            <View style={forwardContainer}>
                                <Image source={icForward} style={{ width: 13, height: 13, resizeMode: 'contain', tintColor: 'white' }} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        handleLinkPress(TERMS_AND_CONDITION_URL)
                    }}>
                        <View style={settingItemContainer}>
                            <Text style={$labelContainer}>{TERMS_AND_CONDITION_LABEL}</Text>
                            <View style={forwardContainer}>
                                <Image source={icForward} style={{ width: 13, height: 13, resizeMode: 'contain', tintColor: 'white' }} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        handleLinkPress(CUSTOMER_HELP_URL)
                    }}>
                        <View style={settingItemContainer}>
                            <Text style={$labelContainer}>{CUSTOMER_HELP_LABEL}</Text>
                            <View style={forwardContainer}>
                                <Image source={icForward} style={{ width: 13, height: 13, resizeMode: 'contain', tintColor: 'white' }} />
                            </View>
                        </View>
                    </TouchableOpacity>


                    {
                        (loginScreenState.data != null && loginScreenState.data.token != null && loginScreenState.data.token != "") ?
                            (
                                <View>

                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate(orderHistoryNavigator);
                                    }}>
                                        <View style={settingItemContainer}>
                                            <Text style={$labelContainer}>{ORDER_HISTORY_LABEL}</Text>
                                            <View style={forwardContainer}>
                                                <Image source={icForward} style={{ width: 13, height: 13, resizeMode: 'contain', tintColor: 'white' }} />
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {
                                         dispatch(clearUserLoginData());
                                         dispatch(clearUserInfoData())
                                         navigation.dispatch(
                                            CommonActions.reset({
                                                index: 0,
                                                routes: [{ name: DashboardNavigator }],
                                            })
                                        );
                                    }}>
                                        <View style={settingItemContainer}>
                                            <Text style={$labelContainer}>{LOGOUT_LABEL}</Text>
                                            <View style={forwardContainer}>
                                                <Image source={icForward} style={{ width: 13, height: 13, resizeMode: 'contain', tintColor: 'white' }} />
                                            </View>
                                        </View>
                                    </TouchableOpacity>


                                </View>

                            ) :
                            (
                                <View></View>
                            )
                    }


                    <Text style={$followUsContainer}>{FOLLOW_US_LABEL}</Text>
                    <View style={socialIconContainer}>
                        <TouchableOpacity onPress={() => {
                            handleLinkPress(FACEBOOK_URL)
                        }}>
                            <Image source={icFacebook} style={{ width: 22, height: 22, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            handleLinkPress(INSTAGRAM_URL)
                        }}>
                            <View style={instagramIconContainer}>
                                <Image source={icInstagram} style={{ width: 22, height: 22, resizeMode: 'contain' }} />
                            </View>
                        </TouchableOpacity>


                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SettingScreen;