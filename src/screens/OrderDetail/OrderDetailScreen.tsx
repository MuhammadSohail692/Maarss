import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    useColorScheme,
    View,
    ActivityIndicator,
    Image,
    Dimensions
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import ProductDescription from '@components/productDescription/ProductDescription'
import { useSelector, useDispatch } from 'react-redux';
import { NO_INTENRT_CONNECTION, CHECK_YOUR_INTERNET, OK, LoaderColor } from '@constants/app-constants'
import NetInfo from '@react-native-community/netinfo';
import { productDescContainer, productDescViewContainer, textPrompt, productDescViewColumnContainer, addToCartBtn } from '@theme/view'
import { productDescViewRowContainer, productNameViewRowContainer, productQuantityContainer, plusMinusContainer, quantityConatiner } from "@theme/view"
import { $productNameDetail, $productPrice, $productLabel, $productLabelValues, $plusMinusLabel, $quantityContainer } from '@theme/text'

import { fetchOrderDetailData } from '@reducers/orderDetail/order-detail-slice';

const OrderDetailScreen = ({ route, navigation }) => {

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const orderDetailScreenState = useSelector((state) => state.orderDetailData)
    const [initialLoading, setInitialLoading] = useState(true);
    const dispatch = useDispatch();
    const { width } = Dimensions.get('window');
    const height = width * 0.7;

    const { orderId } = route.params;

    useEffect(() => {
        dispatch(fetchOrderDetailData({ orderId: orderId })).then(() => {
            setInitialLoading(false);
        });
    }, []);

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

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}
                style={[backgroundStyle]}>

                {
                    orderDetailScreenState.data.line_items.length > 0 ? (
                        <View>
                            <Image
                                source={{ uri: orderDetailScreenState.data.line_items[0].image.src }}
                                style={{ width, height, resizeMode: 'contain' }}
                            />
                        </View>
                    ) :
                        (<View></View>)
                }

                <View style={[productDescContainer]}>

                    <Text style={[$productPrice, productDescViewContainer]}>Rs.{orderDetailScreenState.data.total}</Text>

                    <View style={[productDescViewRowContainer]}>
                        <Text style={[$productLabel]}>Order Id: </Text>
                        <Text style={[$productLabelValues]}>{orderDetailScreenState.data.id}</Text>
                    </View>

                    <View style={[productDescViewRowContainer]}>
                        <Text style={[$productLabel]}>Status: </Text>
                        <Text style={[$productLabelValues]}>{orderDetailScreenState.data.status}</Text>
                    </View>

                    <View style={[productDescViewRowContainer]}>
                        <Text style={[$productLabel]}>Name: </Text>
                        <Text style={[$productLabelValues]}>{orderDetailScreenState.data.billing.first_name}</Text>
                    </View>


                    <View style={[productDescViewRowContainer]}>
                        <Text style={[$productLabel]}>Address: </Text>
                        <Text style={[$productLabelValues]}>{orderDetailScreenState.data.billing.address_1}</Text>
                    </View>


                    <View style={[productDescViewRowContainer]}>
                        <Text style={[$productLabel]}>City: </Text>
                        <Text style={[$productLabelValues]}>{orderDetailScreenState.data.billing.city}</Text>
                    </View>

                    <View style={[productDescViewRowContainer]}>
                        <Text style={[$productLabel]}>Email: </Text>
                        <Text style={[$productLabelValues]}>{orderDetailScreenState.data.billing.email}</Text>
                    </View>
                    <View style={[productDescViewRowContainer]}>
                        <Text style={[$productLabel]}>Phone: </Text>
                        <Text style={[$productLabelValues]}>{orderDetailScreenState.data.billing.phone}</Text>
                    </View>

                    {
                        orderDetailScreenState.data.line_items.length > 0 ? (
                            <View>
                                <View style={[productDescViewRowContainer]}>
                                    <Text style={[$productLabel]}>Product Name: </Text>
                                    <Text style={[$productLabelValues]}>{orderDetailScreenState.data.line_items[0].name}</Text>
                                </View>

                                <View style={[productDescViewRowContainer]}>
                                    <Text style={[$productLabel]}>Quantity: </Text>
                                    <Text style={[$productLabelValues]}>{orderDetailScreenState.data.line_items[0].quantity}</Text>
                                </View>
                                <View style={[productDescViewRowContainer]}>
                                    <Text style={[$productLabel]}>Sku: </Text>
                                    <Text style={[$productLabelValues]}>{orderDetailScreenState.data.line_items[0].sku}</Text>
                                </View>
                            </View>

                        ) :
                            (<View></View>)
                    }

                    <View style={[productDescViewRowContainer]}>
                        <Text style={[$productLabel]}>Payment Method: </Text>
                        <Text style={[$productLabelValues]}>{orderDetailScreenState.data.payment_method_title}</Text>
                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderDetailScreen;