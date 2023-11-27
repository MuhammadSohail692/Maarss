import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    StatusBar,
    useColorScheme,
    View,
    ActivityIndicator,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
    StyleSheet
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch } from 'react-redux';
import { categiryRowItem, noRecordParentView, textPrompt, orderStatusContainer, categoryListContainer, settingHeaderContainer, historyRowItem, productsContainer, } from "@theme/view"
import { $noRecordContainer, $contactUsHeaderContainer } from '@theme/text'
import { IOrderHistoryCard } from '@types/type';
import { IOrderResponse } from '@model/order/OrderModel';
import { fetchOrderHistoryData, clearOrderHistoryData } from '@reducers/orderHistory/order-history-slice';
import { fetchSubCategoriesData } from '@reducers/subCategories/subcategories-slice';
import { SubCategoryNavigator, ProductNavigator } from '@constants/navigator/navigation-stack';
import { LABEL_NO_RECORD_FOUND, LoaderColor, ORDER_HISTORY_LABEL } from '@constants/app-constants'
import icForward from '@assets/images/ic_forward.png'


const OrderScreen = ({ route, navigation }) => {


    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const dispatch = useDispatch();
    const loginScreenState = useSelector((state) => state.loginData)

    const orderHistoryScreenState = useSelector((state) => state.orderHistoryData)

    const [page, setPage] = useState(1);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        console.log("token " + loginScreenState.data.token)
        if (initialLoading) {
            dispatch(clearOrderHistoryData());
            // loginScreenState.data.token
            dispatch(fetchOrderHistoryData({ customerId: "625", pageNo: page, status: "cancelled" })).then(() => {
                setInitialLoading(false);
            });
        }
        else if (!orderHistoryScreenState.loading) {
            dispatch(fetchOrderHistoryData({ customerId: "625", pageNo: page, status: "cancelled" })).then(() => {
                setLoadingMore(false);
            });
        }
    }, [dispatch, page]);


    const handleLoadMore = () => {
        if (!orderHistoryScreenState.loading && orderHistoryScreenState.pageData.length > 0) {
            console.log("handleLoadMore")
            setPage(page + 1);
            setLoadingMore(true);
        }
    };

    const RowItem = ({ orderId, status, total, navigation }: IOrderHistoryCard) => {

        return (
            <TouchableOpacity
                onPress={() => {
                    // navigation.navigate(SubCategoryNavigator, { categoryId: categoryId });
                }}
            >
                <View style={historyRowItem}>
                    <Text numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ color: Colors.black, fontSize: 13, fontWeight: '600', marginStart: 5, marginEnd: 5 }}>OrderId: {orderId}</Text>
                    <View style={[orderStatusContainer, { backgroundColor: status == "cancelled" ? '#FF0000' : "#008000" }]}>
                        <Text numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{ color: Colors.white, fontSize: 11, fontWeight: '500', marginStart: 5, marginEnd: 5 }}>{status.toUpperCase()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }


    if (initialLoading) {
        // Show the initial loader in the center
        return (
            <View style={[textPrompt, { height: 260 }]}>
                <ActivityIndicator size="large" color={LoaderColor} />
            </View>
        );
    }
    if (orderHistoryScreenState.error != "") {
        return (<View style={textPrompt}>
            <Text>Error: {orderHistoryScreenState.error}</Text>
        </View>
        );
    }

    const renderItem = ({ item }
        : IOrderResponse) => (
        <RowItem orderId={item.id} status={item.status} total={item.total} navigation={navigation} />
    );


    return (
        <SafeAreaView style={backgroundStyle} >
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <View style={productsContainer}>
                {
                    orderHistoryScreenState.data.length > 0 ? (
                        <View>
                            <View style={settingHeaderContainer}>
                                <Text style={$contactUsHeaderContainer}>{ORDER_HISTORY_LABEL}</Text>
                            </View>
                            <View style={categoryListContainer}>
                                <FlatList
                                    data={orderHistoryScreenState.data ?? []}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id}
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled={true}
                                    onEndReached={handleLoadMore}
                                    onEndReachedThreshold={0.1} // Adjust as needed
                                    ListFooterComponent={() => (
                                        <View style={{ paddingVertical: 10 }}>
                                            {loadingMore ? (
                                                <ActivityIndicator size="large" color={LoaderColor} />
                                            ) : null}
                                        </View>
                                    )}
                                />
                            </View>
                        </View>

                    ) : (
                        <View style={[noRecordParentView]}>
                            <Text style={[$noRecordContainer]}>{LABEL_NO_RECORD_FOUND}</Text>
                        </View>)
                }
            </View>
        </SafeAreaView>
    );
};

export default OrderScreen;