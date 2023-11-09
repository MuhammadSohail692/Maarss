import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    useColorScheme,
    View,
    ActivityIndicator,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch } from 'react-redux';
import { bestfavoriteRowItem,noRecordParentView,textPrompt,productsContainer } from "@theme/view"
import { $noRecordContainer, } from '@theme/text'
import { IBestSellingProductCard } from '@types/type';
import { IBestSellingProductRespose } from '@model/home/bestSellingProductModel/BestSellingProductModel';
import { fetchProductData,clearProductData } from '@reducers/product/product-slice';
import { ProductDetailNavigator } from '@constants/navigator/navigation-stack';
import { LABEL_IMAGE_NOT_FOUND, LABEL_NO_RECORD_FOUND, LoaderColor } from '@constants/app-constants'

const RowItem = ({ prodId, name, price, categories, image, navigation }: IBestSellingProductCard) => {
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
                navigation.navigate(ProductDetailNavigator, { productId: prodId });
            }}
        >
            <View style={bestfavoriteRowItem}>
                <View style={{ flex: 1 }}>
                    <Image source={{ uri: productImg }} style={{
                        height: 100, resizeMode: 'contain',

                        borderTopLeftRadius: 10, borderBottomLeftRadius: 10
                    }} alt={LABEL_IMAGE_NOT_FOUND} />
                </View>
                <View style={{ flex: 2 }}>
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
                        style={{ color: '#A9A9A9', fontSize: 12, fontWeight: '600', marginTop: 5, marginStart: 12 }}>Rs.{price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}


const ProductScreen = ({route , navigation }) => {


    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const productScreenState = useSelector((state) => state.productData)

    const [initialLoading, setInitialLoading] = useState(true);
    const dispatch = useDispatch();
    
    const { categoryId } = route.params; 
    console.log("cateory id "+ categoryId)

    useEffect(() => {
        dispatch(clearProductData());
        
        dispatch(fetchProductData({categoryId:categoryId})).then(() => {
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
        : IBestSellingProductRespose) => (
        <RowItem prodId={item.id} name={item.name} price={item.price} categories={item.categories} image={item.images} navigation={navigation} />
    );


    return (
        <SafeAreaView style={backgroundStyle} >
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <View style={productsContainer}>
            {
                productScreenState.data.length > 0 ? (
                    <View >
                       <FlatList
                    data={productScreenState.data ?? []}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />
                    </View>

                ) : (
                <View style={[ noRecordParentView]}>
                <Text style={[$noRecordContainer]}>{LABEL_NO_RECORD_FOUND}</Text>
                </View>)
            }
</View>
        </SafeAreaView>
    );
};

export default ProductScreen;