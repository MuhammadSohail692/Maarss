import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    useColorScheme,
    TouchableOpacity
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { textPrompt } from '@theme/view'
import { bestProductRowItem } from "@theme/view"
import { $bestSellingProductContainer } from '@theme/text'
import { IBestSellingProductCard } from '@types/type';
import { LABEL_IMAGE_NOT_FOUND, BEST_SELLING_PRODUCTS, LoaderColor } from '@constants/app-constants'
import { useSelector, useDispatch } from 'react-redux';
import { IBestSellingProductRespose } from '@model/home/bestSellingProductModel/BestSellingProductModel';
import { fetchBestSellingProductsData } from '@reducers/home/best-selling-products-slice';
import { ProductDetailNavigator} from '@constants/navigator/navigation-stack';


const BestSellingProducts = ({ navigation }) => {

    
    const isDarkMode = useColorScheme() === 'dark';

    const textStyles = {
        color: isDarkMode ? Colors.light : Colors.dark,
    };
    const bestSellingPriceScreenState = useSelector((state) => state.bestSellingProducts)
    const [initialLoading, setInitialLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBestSellingProductsData()).then(() => {
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
    
const RowItem = ({prodId, name, price, categories, image,navigation }: IBestSellingProductCard) => {
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
            <View style={{ marginRight: 3, marginTop: 10 }}>
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
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(ProductDetailNavigator,{ productId: prodId });
            }}
        >
            <View style={bestProductRowItem}>
                <View >
                    <Image source={{ uri: productImg }} style={{
                        width: 200, height: 150, resizeMode: 'contain',

                        borderTopLeftRadius: 10, borderTopRightRadius: 10
                    }} alt={LABEL_IMAGE_NOT_FOUND} />
                </View>
                {
                    categoriesList.length > 0 ? (
                        categoriesList
                    ) : (<View></View>)
                }
                <Text numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{ color: textStyles.color, fontSize: 13, fontWeight: '600', marginTop: 5, marginStart: 5, marginEnd: 5, textAlign: 'center' }}>{name}</Text>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ color: '#A9A9A9', fontSize: 12, fontWeight: '600', marginTop: 5, marginStart: 10 }}>Rs.{price}</Text>

            </View>
        </TouchableOpacity>
    );
}

    const renderItem = ({ item }
        : IBestSellingProductRespose) => (
        <RowItem prodId={item.id} name={item.name} price={item.price} categories={item.categories} image={item.images} navigation={navigation} />
    );
    return (
        <View >
            <Text
                style={[$bestSellingProductContainer,textStyles]}>{BEST_SELLING_PRODUCTS}</Text>
            <View style={{ marginTop: 10 }}>
                <FlatList
                    data={bestSellingPriceScreenState.data ?? []}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>

    );
};

export default BestSellingProducts;