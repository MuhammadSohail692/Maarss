import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import HTML from 'react-native-render-html';
import { subTotalContainer, billingContiner, shipmentType, textPrompt } from '@theme/view'
import { $billingInfoLabelContainer } from '@theme/text'
import { IShippingTypeCard } from '@types/type';
import { fetchfavouriteData } from '@reducers/favourite/favourite-slice'
import { fetchCartData } from '@reducers/cart/cart-slice'
import icFavourite from '@assets/images/ic_favourite.png'
import icPlus from '@assets/images/ic_plus.png'
import icMinus from '@assets/images/ic_minus.png'
import icFavouriteFilled from '@assets/images/ic_favourite_filled.png'
import { showShortToast } from '@utils/Utilities'
import { SUBTOTAL_LABEL, SHIPPING_LABEL, TOTAL_LABEL, DELIVERY_LABEL, COUNTRY_ID, LoaderColor } from '@constants/app-constants'
import { useSelector, useDispatch } from 'react-redux';
import { IShippingResponse } from '@model/shipping/ShippingModel';
import { fetchShippingMethodData } from '@reducers/shipping/shipping-slice';
import { IBestSellingProductRespose } from '@model/home/bestSellingProductModel/BestSellingProductModel';


const ShippingType = ({ navigation }) => {

    const shippingMethodScreenState = useSelector((state) => state.shippingMethod)
    const cartScreenState = useSelector((state) => state.cartData)

    const [deliverySelectedValue, setDeliverySelectedValue] = useState("Cash on delivery");
    const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
    const [selectedShippingPrice, setSelectedShippingPrice] = useState(0);

    var [totalAmount, setTotalAmount] = useState(0);
    var [subTotal,setSubTotal] = useState(0)

    const cardItems:IBestSellingProductRespose[] = cartScreenState.data
    const [initialLoading, setInitialLoading] = useState(true);
    const dispatch = useDispatch();
    
    useEffect(() => {
        let  subTotalInt =0
        let  total =0
        if(cardItems.length>0){
        
            for (let i = 0; i < cardItems.length; i++) {
                var price = parseInt(cardItems[i].price);
                subTotalInt += price;
            }
             total = subTotalInt + parseInt(selectedShippingPrice)
                // console.log("subTotal:"+subTotalInt)
                // console.log("total:"+total)

            setSubTotal(subTotalInt)
            setTotalAmount(total)
        }
    }, [cartScreenState,selectedShippingPrice]);

    useEffect(() => {
        if(shippingMethodScreenState.data!=null && shippingMethodScreenState.data.length>0){
        setSelectedShippingMethod(shippingMethodScreenState.data[0].id)
        }
    }, [shippingMethodScreenState]);

    
    useEffect(() => {
        dispatch(fetchShippingMethodData({ countryId: COUNTRY_ID })).then(() => {
            setInitialLoading(false);
        });
    }, []);

    const handleShippingMethodSelection = (id, title, price) => {
        console.log("ds" + id + title + price)
        setSelectedShippingMethod(id);
        setSelectedShippingPrice(price);
    };


    const RowItem = ({ id, title, price }: IShippingTypeCard) => {

        return (
            <TouchableOpacity onPress={() => handleShippingMethodSelection(id, title, price)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                        <View
                            style={{
                                height: 18,
                                width: 18,
                                borderRadius: 12,
                                borderWidth: 2,
                                borderColor: selectedShippingMethod === id ? '#3BB54A' : 'black',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {selectedShippingMethod === id && (
                                <View
                                    style={{
                                        height: 9,
                                        width: 9,
                                        borderRadius: 6,
                                        backgroundColor: '#3BB54A',
                                    }}
                                />
                            )}
                        </View>
                        <Text style={{ marginLeft: 8 }}>{title}</Text>
                    </View>
                    {
                        price != "0" ? (
                            <Text style={{ textAlign: 'right' }}>Rs.{price}</Text>
                        ) : (
                            <View></View>)
                    }
                </View>
            </TouchableOpacity>
        );
    }

    const handleDeliveryTypeClick = (value) => {
        setDeliverySelectedValue(value);
    };
    const renderItem = ({ item }: IShippingResponse) => (
        <RowItem id={item.id} title={item.title} price={item.settings.cost == null ? "0" : item.settings.cost.value} />
    );

    return (
        <View>
            <View style={shipmentType}>

                <Text style={[$billingInfoLabelContainer]}>{DELIVERY_LABEL}</Text>

                <View style={{ marginTop: 12 }}>
                    <TouchableOpacity onPress={() => handleDeliveryTypeClick('Cash on delivery')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View
                                style={{
                                    height: 18,
                                    width: 18,
                                    borderRadius: 12,
                                    borderWidth: 2,
                                    borderColor: deliverySelectedValue === 'Cash on delivery' ? '#3BB54A' : 'black',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {deliverySelectedValue === 'Cash on delivery' && (
                                    <View
                                        style={{
                                            height: 9,
                                            width: 9,
                                            borderRadius: 6,
                                            backgroundColor: '#3BB54A',
                                        }}
                                    />
                                )}
                            </View>
                            <Text style={{ marginLeft: 8 }}>Cash on delivery</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleDeliveryTypeClick('Direct bank trasnfer')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <View
                                style={{
                                    height: 18,
                                    width: 18,
                                    borderRadius: 12,
                                    borderWidth: 2,
                                    borderColor: deliverySelectedValue === 'Direct bank trasnfer' ? '#3BB54A' : 'black',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {deliverySelectedValue === 'Direct bank trasnfer' && (
                                    <View
                                        style={{
                                            height: 9,
                                            width: 9,
                                            borderRadius: 6,
                                            backgroundColor: '#3BB54A',
                                        }}
                                    />
                                )}
                            </View>
                            <Text style={{ marginLeft: 8 }}>Direct bank trasnfer</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Text style={[$billingInfoLabelContainer, { marginTop: 15 }]}>{SHIPPING_LABEL}</Text>

                {

                    !initialLoading ? (

                        <View style={{ marginTop: 12 }}>
                            {
                                shippingMethodScreenState.error != "" ? (
                                    <View style={textPrompt}>
                                        <Text>Error: {shippingMethodScreenState.error}</Text>
                                    </View>
                                ) : (
                                    <FlatList
                                        data={shippingMethodScreenState.data ?? []}
                                        renderItem={renderItem}
                                        keyExtractor={(item) => item.id}
                                        showsVerticalScrollIndicator={false}
                                    />
                                )
                            }
                        </View>
                    ) : (
                        <View style={[textPrompt,]}>
                            <ActivityIndicator size="large" color={LoaderColor} />
                        </View>
                    )
                }

                <View style={[billingContiner, { marginTop: 18 }]}>
                    <Text style={$billingInfoLabelContainer}>{SUBTOTAL_LABEL}</Text>
                    <View style={[$billingInfoLabelContainer,subTotalContainer]}>
                    <Text style={{ color: '#54595F', fontSize: 13, fontWeight: '500', textAlign: 'center' }}>RS.</Text>
                    <Text style={{ color: '#54595F', fontSize: 13, fontWeight: '500', textAlign: 'center' }}>{subTotal}</Text>
                    </View>
                </View>
                <View style={[billingContiner, { marginTop: 10 }]}>
                    <Text style={$billingInfoLabelContainer}>{TOTAL_LABEL}</Text>
                    <View style={[$billingInfoLabelContainer,subTotalContainer]}>
                    <Text style={{ color: '#54595F', fontSize: 13, fontWeight: '500', textAlign: 'center' }}>RS.</Text>
                    <Text style={{ color: '#54595F', fontSize: 14, fontWeight: '500', textAlign: 'center' }}>{totalAmount}</Text>
                    </View>
                </View>
            </View>

        </View>
    );
};

export default ShippingType;