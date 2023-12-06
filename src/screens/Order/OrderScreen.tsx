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
import { noRecordParentView, textPrompt, orderStatusContainer, orderHistoryListContainer, settingHeaderContainer, historyRowItem, parentContainer, orderStatusViewOne, orderStatusViewTwo, orderStatusViewThree, orderStatusParent, orderStatusViewFour } from "@theme/view"
import { $noRecordContainer, $contactUsHeaderContainer, $statusBoxText } from '@theme/text'
import { IOrderHistoryCard } from '@types/type';
import { IOrderResponse } from '@model/order/OrderModel';
import { fetchOrderHistoryData, clearOrderHistoryData } from '@reducers/orderHistory/order-history-slice';
import { orderDetailHistoryNavigator } from '@constants/navigator/navigation-stack';
import { LABEL_NO_RECORD_FOUND, LoaderColor, ORDER_HISTORY_LABEL } from '@constants/app-constants'
import { orderHistoryFlatListCartContainer } from "@theme/view"

const OrderScreen = ({ route, navigation }) => {


    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const dispatch = useDispatch();
    const loginScreenState = useSelector((state) => state.loginUserInfo)

    const orderHistoryScreenState = useSelector((state) => state.orderHistoryData)

    const [page, setPage] = useState(1);
    const [initialLoading, setInitialLoading] = useState(true);
    const [tabLoading, setTabLoading] = useState(false);
    const [statusTab, setStatusTab] = useState("all");
    const [loadingMore, setLoadingMore] = useState(false);
    var customerId = -1;
    if (loginScreenState.data.length > 0) {
        customerId = loginScreenState.data[0].id
    }

    useEffect(() => {

        if (initialLoading) {
            dispatch(clearOrderHistoryData());
            dispatch(fetchOrderHistoryData({ customerId: customerId, pageNo: page, status: statusTab })).then(() => {
                setInitialLoading(false);
            });
        }
        else if (!orderHistoryScreenState.loading) {
            dispatch(fetchOrderHistoryData({ customerId: customerId, pageNo: page, status: statusTab })).then(() => {
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

    const statusTabClicked = (value) => {
        dispatch(clearOrderHistoryData());
        setPage(1);
        setStatusTab(value);
        setTabLoading(true);
        dispatch(fetchOrderHistoryData({ customerId: customerId, pageNo: 1, status: value })).then(() => {
            setTabLoading(false);
        });
    };


    const RowItem = ({ orderId, status, total, navigation }: IOrderHistoryCard) => {

        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(orderDetailHistoryNavigator, { orderId: orderId });
                }}
            >
                <View style={historyRowItem}>
                    <Text numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ color: Colors.black, fontSize: 13, fontWeight: '600', marginStart: 5, marginEnd: 5 }}>OrderId: {orderId}</Text>
                    <View style={[orderStatusContainer, { backgroundColor: status == "cancelled" ? '#FF0000' : status == "processing" ? "#ADD8E6" : status == "completed" ? "#008000" : "lightgrey" }]}>
                        <Text numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{ color: Colors.white, fontSize: 11, fontWeight: '500', marginStart: 5, marginEnd: 5 }}>{status.toUpperCase()}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        );
    }


    if (initialLoading || tabLoading) {
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
            <View style={parentContainer}>
                <View style={settingHeaderContainer}>
                    <Text style={$contactUsHeaderContainer}>{ORDER_HISTORY_LABEL}</Text>
                </View>

                <View style={orderStatusParent}>

                    <TouchableOpacity style={[orderStatusViewOne, { backgroundColor: statusTab == "all" ? '#5A5A5A' : "lightgrey" }]} onPress={() => statusTabClicked("all")}>
                        <Text style={$statusBoxText}>All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[orderStatusViewTwo, { backgroundColor: statusTab == "processing" ? '#ADD8E6' : "lightgrey" }]} onPress={() => statusTabClicked("processing")}>
                        <Text style={$statusBoxText}>Processing</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[orderStatusViewThree, { backgroundColor: statusTab == "completed" ? '#008000' : "lightgrey" }]} onPress={() => statusTabClicked("completed")}>
                        <Text style={$statusBoxText}>Completed</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={[orderStatusViewFour, { backgroundColor: statusTab == "cancelled" ? '#FF0000' : "lightgrey" }]} onPress={() => statusTabClicked("cancelled")}>
                        <Text style={$statusBoxText}>Cancelled</Text>
                    </TouchableOpacity>


                </View>
                {

                    orderHistoryScreenState.data.length > 0 ? (
                        <View style={{ marginTop: 10 }}>


                            <View style={orderHistoryListContainer}>
                                <FlatList
                                    data={orderHistoryScreenState.data ?? []}
                                    renderItem={renderItem}
                                    contentContainerStyle={orderHistoryFlatListCartContainer}
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