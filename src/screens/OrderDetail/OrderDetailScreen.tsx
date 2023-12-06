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
    FlatList,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch } from 'react-redux';
import { LoaderColor,LABEL_IMAGE_NOT_FOUND } from '@constants/app-constants'
import { productDescContainer, productDescViewContainer, textPrompt,bestfavoriteRowItem,orderHistoryItemsContainer } from '@theme/view'
import { productDescViewRowContainer } from "@theme/view"
import { $productPrice, $productLabel, $productLabelValues } from '@theme/text'
import { fetchOrderDetailData } from '@reducers/orderDetail/order-detail-slice';
import { IOrderDetailResponse } from '@model/orderDetail/OrderDetailModel';
import { IOrderHistoryItemCard } from '@types/type';

const RowItem = ({ prodId, name, price, image,quantity,sku }: IOrderHistoryItemCard) => {

    return (
            <View style={bestfavoriteRowItem}>
                <View style={{ flex: 1 }}>
                    <Image source={{ uri: image }} style={{
                        height: 100, resizeMode: 'contain',

                        borderTopLeftRadius: 10, borderBottomLeftRadius: 10
                    }} alt={LABEL_IMAGE_NOT_FOUND} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{ color: Colors.black, fontSize: 13, fontWeight: '600', marginTop: 2, marginStart: 12, marginEnd: 5 }}>{name}</Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ color: '#A9A9A9', fontSize: 12, fontWeight: '600', marginTop: 2, marginStart: 12 }}>Rs.{price}</Text>
                     <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ color: '#A9A9A9', fontSize: 12, fontWeight: '600', marginTop: 2, marginStart: 12 }}>Quantity: {quantity}</Text>
              <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ color: '#A9A9A9', fontSize: 12, fontWeight: '600', marginTop: 2, marginStart: 12 }}>Sku: {sku}</Text>
              
                </View>
            </View>
    );
}

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

    const renderItem = ({ item }
        : IOrderDetailResponse) => (
        <RowItem prodId={item.product_id} name={item.name} price={item.price} image={item.image.src} quantity={item.quantity} sku={item.sku}/>
    );

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

                <View style={[productDescContainer]}>

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


                    <View style={[productDescViewRowContainer]}>
                        <Text style={[$productLabel]}>Payment Method: </Text>
                        <Text style={[$productLabelValues]}>{orderDetailScreenState.data.payment_method_title}</Text>
                    </View>
                    
                    <View style={[productDescViewRowContainer]}>
                        <Text style={[$productLabel]}>Subtotal: </Text>
                        <Text style={[$productLabelValues]}>Rs.{orderDetailScreenState.data.total}</Text>
                    </View>

                    {
                    orderDetailScreenState.data.line_items.length > 0 ? (
                        <View style={orderHistoryItemsContainer}>
                        <FlatList
                                    data={orderDetailScreenState.data.line_items ?? []}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id}
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled={false}
                                />
                                </View>
                    ) :
                        (<View></View>)
                }

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderDetailScreen;