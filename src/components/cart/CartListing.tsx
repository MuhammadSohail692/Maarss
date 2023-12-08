import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { bestfavoriteRowItem, noRecordParentView, checkoutBtn, headerCartContiner } from "@theme/view"
import { $favouriteLabelContainer, $noRecordContainer } from '@theme/text'
import { ICartProductsCard } from '@types/type';
import { LABEL_IMAGE_NOT_FOUND, CART_LABEL, LABEL_NO_RECORD_FOUND } from '@constants/app-constants'
import { IBestSellingProductRespose } from '@model/home/bestSellingProductModel/BestSellingProductModel';
import { ProductDetailNavigator, BillingInfoNavigator } from '@constants/navigator/navigation-stack';
import { flatListCartContainer } from "@theme/view"
import icClose from '@assets/images/ic_close.png'
import { removeCartItemById } from '@reducers/cart/cart-slice'
import { removeProductsInfoById } from '@reducers/selectedProducts/selected-products-slice'
import { useDispatch } from 'react-redux';


const CartListing = ({ isDarkMode,cartList, navigation }) => {

    const dispatch = useDispatch();

    const textStyles = {
        color: isDarkMode ? Colors.light : Colors.dark,
    };

    const RowItem = ({ prodId, name, price, categories, image,quantity, navigation }: ICartProductsCard) => {
        var categoriesList = [];
        var categoriesStr = "";
        var productImg = "";
    
        if (categories.length > 0) {
    
            for (let i = 0; i < categories.length; i++) {
                categoriesStr += categories[i].name;
                if (categories.length - 1 != i) {
                    categoriesStr += ", ";
                }
            }
            categoriesList.push(
                <View style={{ marginRight: 3, marginTop: 0 }}>
                    <Text
                        style={{ color: "#A9A9A9", fontSize: 12, fontWeight: '600' }}>{categoriesStr}</Text>
                </View>
            )
        }
    
        if (image.length > 0) {
            if (image[0] !== null && image[0].src != null) {
                productImg = image[0].src
            }
        }
    
        return (
                <View style={bestfavoriteRowItem}>
                    <View style={{ flex: 1 }}>
                        <Image source={{ uri: productImg }} style={{
                            height: 100, resizeMode: 'contain',
                            borderTopLeftRadius: 10, borderBottomLeftRadius: 10
                        }} alt={LABEL_IMAGE_NOT_FOUND} />
                    </View>
                    <View style={{ flex: 2,padding:5}}>
                    <TouchableOpacity  onPress={() => {
                                dispatch(removeCartItemById({ productId: prodId}));
                                dispatch(removeProductsInfoById({ productId: prodId}));
                                }}>
                        <Image
                                source={icClose}
                                style={{
                                    width: 18,
                                    height: 18,
                                    padding: 8,
                                    marginEnd:5,
                                    marginTop:2,
                                    alignSelf:'flex-end',
                                }}
                            />
                            </TouchableOpacity>
                        {
                            categoriesList.length > 0 ? (
                                <View style={{ marginStart: 12 }}>
                                    {categoriesList}
                                </View>
                            ) : (<View></View>)
                        }
                        <Text numberOfLines={2}
                            ellipsizeMode="tail"
                            style={{ color: Colors.black, fontSize: 13, fontWeight: '600', marginTop: 5, marginStart: 12, marginEnd: 5 }}>{name}</Text>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{ color: '#A9A9A9', fontSize: 12, fontWeight: '600', marginTop: 4, marginStart: 12 }}>Rs.{price}</Text>
                              <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{ color: '#A9A9A9', fontSize: 12, fontWeight: '600', marginTop: 4, marginStart: 12 }}>Quantity: {quantity}</Text>
                
                    </View>
                </View>
        );
    }
    

    const renderItem = ({ item }
        : IBestSellingProductRespose) => (
        <RowItem prodId={item.id} name={item.name} price={item.price} categories={item.categories} image={item.images} quantity={item.stock_quantity} navigation={navigation} />
    );
    return (
        <View>
            <View style={[headerCartContiner]}>
                <Text style={[$favouriteLabelContainer,textStyles]}>{CART_LABEL}</Text>
                {
                    cartList.length > 0 ? (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(BillingInfoNavigator);
                            }}
                        >
                            <View style={checkoutBtn}>
                                <Text
                                    style={{ color: '#ffffff', fontSize: 12, fontWeight: '700', textAlign: 'center' }}>Checkout</Text>
                            </View>
                        </TouchableOpacity>

                    ) : (<View></View>)
                }
            </View>

            {
                cartList.length > 0 ? (
                    <View style={{ marginTop: 15 }}>
                        <FlatList
                            data={cartList ?? []}
                            renderItem={renderItem}
                            contentContainerStyle={flatListCartContainer}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                ) : (
                    <View style={[noRecordParentView]}>
                        <Text style={[$noRecordContainer,textStyles]}>{LABEL_NO_RECORD_FOUND}</Text>
                    </View>)
            }

        </View>

    );
};

export default CartListing;