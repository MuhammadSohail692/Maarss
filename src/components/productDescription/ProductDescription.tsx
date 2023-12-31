import React, { useEffect, useState } from 'react';
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
import HTML from 'react-native-render-html';
import { productDescContainer, productDescViewContainer, productDescViewColumnContainer, addToCartBtn } from '@theme/view'
import { productDescViewRowContainer, productNameViewRowContainer, productQuantityContainer, plusMinusContainer, quantityConatiner } from "@theme/view"
import { $productNameDetail, $productPrice, $productLabel, $productLabelValues, $plusMinusLabel, $quantityContainer } from '@theme/text'
import { IProductColors, IProductDetailColors, IProductDetailSize, ISelectedProductColor } from '@types/type';
import { fetchfavouriteData } from '@reducers/favourite/favourite-slice'
import { fetchCartData, updateCartItemQuantity } from '@reducers/cart/cart-slice'
import { fetchSelectedProductsData } from '@reducers/selectedProducts/selected-products-slice'
import icFavourite from '@assets/images/ic_favourite.png'
import icPlus from '@assets/images/ic_plus.png'
import icMinus from '@assets/images/ic_minus.png'
import icFavouriteFilled from '@assets/images/ic_favourite_filled.png'
import { useDispatch,useSelector } from 'react-redux';
import { showShortToast } from '@utils/Utilities'
import { ADD_TO_CART_LABEL } from '@constants/app-constants'

const ProductDescription = ({isDarkMode, data, navigation }) => {

    const dispatch = useDispatch();
    
    const textStyles = {
        color: isDarkMode ? Colors.light : Colors.dark,
    };
    const [setFavourite, setFavouriteSelected] = useState(false);
    const [setQuantity, setQuantityValue] = useState(1);
    const [selectedColorItem, setSelectedColorItem] = useState(-1);
    const [selectorColorValue, setSelectorColorValue] = useState("");
    const [selectedSizeItem, setSelectedSizeItem] = useState(-1);

    const cartScreenState = useSelector((state) => state.cartData)

    var colorList: IProductDetailColors[] = [];

    var categoriesList = [];
    var categoriesStr = "";

    var tagsList = [];
    var tagsStr = "";

    var colorAvaliable: string[] = []
    var colorLabel = ""

    var sizeAvailable: string[] = []
    var sizeLabel = ""

    var selectedProductColor: ISelectedProductColor[] = [];
    var colorAvaliableVariationIds: number[] = []


    if (data.categories != null) {
        if (data.categories.length > 0) {
            for (let i = 0; i < data.categories.length; i++) {
                categoriesStr += data.categories[i].name;

                if (data.categories.length - 1 != i) {
                    categoriesStr += ", ";
                }
            }
            categoriesList.push(
                <View style={{ marginRight: 3 }}>
                    <Text
                        style={$productLabelValues}>{categoriesStr}</Text>
                </View>
            )
        }
    }

    if (data.tags != null) {
        if (data.tags.length > 0) {

            for (let i = 0; i < data.tags.length; i++) {
                tagsStr += data.tags[i].name;

                if (data.tags.length - 1 != i) {
                    tagsStr += ", ";
                }
            }
            tagsList.push(
                <View style={{ marginRight: 3 }}>
                    <Text
                        style={$productLabelValues}>{tagsStr}</Text>
                </View>
            )
        }
    }

    if (data.attributes != null) {
        if (data.attributes.length > 0) {
            for (let i = 0; i < data.attributes.length; i++) {
                if (data.attributes[i].name == "color") {
                    colorLabel = data.attributes[i].name
                    colorAvaliable = data.attributes[i].options
                }
               else if (data.attributes[i].name == "Size") {
                    sizeLabel = data.attributes[i].name
                    sizeAvailable = data.attributes[i].options
                }
            }
        }
    }

    if (data.variations != null) {
        if (data.variations.length > 0) {
            colorAvaliableVariationIds = data.variations
        }
    }

    colorAvaliable.forEach((color, index) => {
        const newItem: IProductDetailColors = {
            id: index,
            color: color,
        };
        colorList.push(newItem);
    });


    var productsColorList = sizeAvailable.map((option, index) => ({
        option,
        variation: colorAvaliableVariationIds[index]
    }));

    console.log("productsColorList " + JSON.stringify(productsColorList))

    const RowColorItem = ({ id, colorName }: IProductColors) => {
        const isSelected = id === selectedColorItem;

        return (
            <TouchableOpacity
                onPress={() => {
                    setSelectedColorItem(id)
                    setSelectorColorValue(colorName)
                }}
            >
                <Text style={{ color: isSelected ? Colors.white : Colors.black, fontSize: 12, marginEnd: 8, fontWeight: '600', padding: 10, backgroundColor: isSelected ? '#3BB54A' : '#ffffff' }}>{colorName}</Text>
            </TouchableOpacity>
        );
    }

    const RowSizeItem = ({ id, size }: IProductDetailSize) => {
        const isSelected = id === selectedSizeItem;

        return (
            <TouchableOpacity
                onPress={() => {
                    setSelectedSizeItem(id)
                }}
            >
                <Text style={{ color: isSelected ? Colors.white : Colors.black, fontSize: 12, fontWeight: '600', marginEnd: 8, padding: 10, backgroundColor: isSelected ? '#3BB54A' : '#ffffff' }}>{size}</Text>
            </TouchableOpacity>
        );
    }

    const renderColorItem = ({ item }) => (
        <RowColorItem id={item.id} colorName={item.color} />
    );

    const renderSizeItem = ({ item }) => (
        <RowSizeItem id={item.variation} size={item.option} />
    );

    return (

        <View style={productDescContainer}>

            <View style={[productNameViewRowContainer]}>

                <Text style={[$productNameDetail,textStyles]}>{data.name}</Text>

                <TouchableOpacity
                    onPress={() => {
                        dispatch(fetchfavouriteData({ favoriteItem: data })).then(() => {
                            setFavouriteSelected(true);
                        });
                    }}
                >
                    <Image source={setFavourite ? icFavouriteFilled : icFavourite} style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: setFavourite ? '#FF0000' : textStyles.color, }} />
                </TouchableOpacity>
            </View>
            <Text style={[$productPrice, productDescViewContainer,textStyles]}>Rs.{data.price}</Text>

            <View style={[productDescViewRowContainer]}>
                <Text style={[$productLabel,textStyles]}>SKU: </Text>
                <Text style={[$productLabelValues,]}>{data.sku}</Text>
            </View>
            <View style={[productDescViewRowContainer]}>
                <Text style={[$productLabel,textStyles]}>Stock: </Text>
                <Text style={[$productLabelValues]}>{data.stock_status}</Text>
            </View>

            {
                data.weight != "" ? (
                    <View style={[productDescViewRowContainer]}>
                        <Text style={[$productLabel,textStyles]}>Weight: </Text>
                        <Text style={[$productLabelValues]}>{data.weight}</Text>
                    </View>) : <View></View>
            }

            <View style={[productDescViewRowContainer]}>
                <Text style={[$productLabel,textStyles]}>Categories: </Text>
                {
                    categoriesList.length > 0 ? (
                        categoriesList
                    ) : (<View></View>)
                }
            </View>
            {
                tagsList.length > 0 ? (
                    <View style={[productDescViewRowContainer]}>
                        <Text style={[$productLabel,textStyles]}>Tags: </Text>
                        {tagsList}
                    </View>) : (<View></View>)
            }

            {
                colorList.length > 0 ? (

                    <View style={[productDescViewColumnContainer]}>
                        <Text style={[$productLabel]}>{colorLabel}: </Text>
                        <View style={{ marginTop: 10 }}>
                            <FlatList
                                data={colorList ?? []}
                                renderItem={renderColorItem}
                                keyExtractor={(item) => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>) : <View></View>

            }
            {
                productsColorList.length > 0 ? (
                    <View style={[productDescViewColumnContainer]}>
                        <Text style={[$productLabel,textStyles]}>{sizeLabel}:</Text>
                        <View style={{ marginTop: 10 }}>
                            <FlatList
                                data={productsColorList ?? []}
                                renderItem={renderSizeItem}
                                keyExtractor={(item) => item.variation}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>) : <View></View>

            }
            <View style={quantityConatiner}>
                <Text style={[$productLabel,textStyles]}>Quantity: </Text>
                <View style={[productQuantityContainer]}>
                    <TouchableOpacity
                        onPress={() => {
                            if (setQuantity >= 2)
                                setQuantityValue(setQuantity - 1)
                            else
                                setQuantityValue(1)
                        }}
                    >
                        <View style={[plusMinusContainer]}>
                            <Image source={icMinus} style={{ width: 10, height: 10, resizeMode: 'contain' }} />
                        </View>
                    </TouchableOpacity>

                    <Text style={[$quantityContainer,textStyles]}>{setQuantity}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setQuantityValue(setQuantity + 1)
                        }}
                    >
                        <View style={[plusMinusContainer]}>
                            <Image source={icPlus} style={{ width: 10, height: 10, resizeMode: 'contain' }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[productDescViewContainer]}>
                <Text style={[$productLabel,textStyles]}>Description:</Text>
                <HTML source={{ html: data.description}} />
            </View>
            <TouchableOpacity
                onPress={() => {
                    console.log("colorAvaliable" + colorAvaliable)
                    console.log("selectedSizeItem "+selectedSizeItem)
                    if (selectedSizeItem == -1) {
                        showShortToast("Please select size")
                    } else if (colorAvaliable.length > 0 && selectorColorValue == "") {
                        showShortToast("Please select color")

                    } else {
                        var selectedProductItems = {}
                        if (colorAvaliable.length > 0) {
                            const newItem: ISelectedProductColor = {
                                key: 'Color',
                                value: selectorColorValue,
                            };
                            selectedProductColor.push(newItem);

                            selectedProductItems = {
                                product_id: data.id,
                                quantity: setQuantity,
                                variation_id: selectedSizeItem,
                                meta_data: selectedProductColor
                            }
                        } else {
                            selectedProductItems = {
                                product_id: data.id,
                                quantity: setQuantity,
                                variation_id: selectedSizeItem,
                            }
                        }
                        console.log("selectedProductItems " + JSON.stringify(selectedProductItems))

                        dispatch(fetchCartData({ cartItem: data })).then(() => {
                            console.log("data.id "+JSON.stringify(data.id))
                            console.log("setQuantity "+setQuantity)

                            dispatch(updateCartItemQuantity({ productId: data.id, newQuantity: setQuantity }));
                            dispatch(fetchSelectedProductsData({ productItems: selectedProductItems })).then(() => {
                                        showShortToast(ADD_TO_CART_LABEL)
                                    });
                        });

                    }
                }}
            >
                <View style={addToCartBtn}>
                    <Text
                        style={{ color: '#ffffff', fontSize: 12, fontWeight: '800', textAlign: 'center' }}>Add to cart</Text>
                </View>
            </TouchableOpacity>
        </View>

    );
};

export default ProductDescription;