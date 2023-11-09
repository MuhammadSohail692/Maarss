import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import HTML from 'react-native-render-html';
import { productDescContainer, productDescViewContainer, productDescViewColumnContainer, addToCartBtn } from '@theme/view'
import { productDescViewRowContainer, productNameViewRowContainer } from "@theme/view"
import { $productNameDetail, $productPrice, $productLabel, $productLabelValues } from '@theme/text'
import { IProductColors, IProductDetailColors, IProductDetailSize } from '@types/type';
import { fetchfavouriteData } from '@reducers/favourite/favourite-slice'
import icFavourite from '@assets/images/ic_favourite.png'
import icFavouriteFilled from '@assets/images/ic_favourite_filled.png'
import { useDispatch } from 'react-redux';
import { FavouriteNavigator } from '@constants/navigator/navigation-stack';

const RowItem = ({ id, colorName }: IProductColors) => {

    return (
        <TouchableOpacity
            onPress={() => {
            }}
        >
            <Text style={{ color: '#000000', fontSize: 12, marginEnd: 8, fontWeight: '600', padding: 10, backgroundColor: "#ffffff" }}>{colorName}</Text>
        </TouchableOpacity>
    );
}

const RowSizeItem = ({ id, size }: IProductDetailSize) => {

    return (
        <TouchableOpacity
            onPress={() => {
            }}
        >
            <Text style={{ color: '#000000', fontSize: 12, fontWeight: '600', marginEnd: 8, padding: 10, backgroundColor: "#ffffff" }}>{size}</Text>
        </TouchableOpacity>
    );
}

const ProductDescription = ({ data, navigation }) => {

    const dispatch = useDispatch();
    const [setFavourite, setFavouriteSelected] = useState(false);

    var colorList: IProductDetailColors[] = [];
    var sizeList: IProductDetailSize[] = [];

    var categoriesList = [];
    var categoriesStr = "";

    var tagsList = [];
    var tagsStr = "";

    var colorAvaliable: string[] = []
    var colorLabel = ""

    var sizeAvailable: string[] = []
    var sizeLabel = ""

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


    if (data.attributes.length > 0) {
        for (let i = 0; i < data.attributes.length; i++) {
            if (data.attributes[i].position == 0) {
                colorLabel = data.attributes[i].name
                colorAvaliable = data.attributes[i].options
            }
            if (data.attributes[i].position == 1) {
                sizeLabel = data.attributes[i].name
                sizeAvailable = data.attributes[i].options
            }
        }
    }

    colorAvaliable.forEach((color, index) => {
        const newItem: IProductDetailColors = {
            id: index,
            color: color,
        };
        colorList.push(newItem);
    });


    sizeAvailable.forEach((color, index) => {
        const newItem: IProductDetailSize = {
            id: index,
            size: color,
        };
        sizeList.push(newItem);
    });

    const renderItem = ({ item }) => (
        <RowItem id={item.id} colorName={item.color} />
    );

    const renderSizeItem = ({ item }) => (
        <RowSizeItem id={item.id} size={item.size} />
    );

    return (
        <View style={productDescContainer}>

            <View style={[productNameViewRowContainer]}>

                <Text style={$productNameDetail}>{data.name}</Text>

                <TouchableOpacity
                    onPress={() => {
                        dispatch(fetchfavouriteData({ favoriteItem: data })).then(() => {
                            console.log("dispatch favourite")
                            setFavouriteSelected(true);
                        });
                    }}
                >
                    <Image source={setFavourite ? icFavouriteFilled : icFavourite} style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: setFavourite ? '#FF0000' : '#000000' }} />
                </TouchableOpacity>
            </View>
            <Text style={[$productPrice, productDescViewContainer]}>Rs.{data.price}</Text>

            <View style={[productDescViewRowContainer]}>
                <Text style={[$productLabel]}>SKU: </Text>
                <Text style={[$productLabelValues]}>{data.sku}</Text>
            </View>
            <View style={[productDescViewRowContainer]}>
                <Text style={[$productLabel]}>Stock: </Text>
                <Text style={[$productLabelValues]}>{data.stock_status}</Text>
            </View>

            {
                data.weight != "" ? (
                    <View style={[productDescViewRowContainer]}>
                        <Text style={[$productLabel]}>Weight: </Text>
                        <Text style={[$productLabelValues]}>{data.weight}</Text>
                    </View>) : <View></View>
            }

            <View style={[productDescViewRowContainer]}>
                <Text style={[$productLabel]}>Categories: </Text>
                {
                    categoriesList.length > 0 ? (
                        categoriesList
                    ) : (<View></View>)
                }
            </View>
            {
                tagsList.length > 0 ? (
                    <View style={[productDescViewRowContainer]}>
                        <Text style={[$productLabel]}>Tags: </Text>
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
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>) : <View></View>

            }
            {
                sizeList.length > 0 ? (
                    <View style={[productDescViewColumnContainer]}>
                        <Text style={[$productLabel]}>{sizeLabel}:</Text>
                        <View style={{ marginTop: 10 }}>
                            <FlatList
                                data={sizeList ?? []}
                                renderItem={renderSizeItem}
                                keyExtractor={(item) => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>) : <View></View>

            }
            <View style={[productDescViewContainer]}>
                <Text style={[$productLabel]}>Description:</Text>
                <HTML source={{ html: data.description }} />
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(FavouriteNavigator);
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