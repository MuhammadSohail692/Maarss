import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import NetInfo from '@react-native-community/netinfo';
import { bestProductRowItem,textPrompt } from "@theme/view"
import {$newArrivalContainer} from '@theme/text'
import { IBestSellingProductCard } from '@types/type';
import { LABEL_IMAGE_NOT_FOUND, NO_INTENRT_CONNECTION, CHECK_YOUR_INTERNET, OK, NEW_ARRIVALS,LoaderColor } from '@constants/app-constants'
import { useSelector, useDispatch } from 'react-redux';
import { IBestSellingProductRespose } from '@model/home/bestSellingProductModel/BestSellingProductModel';
import { fetchNewArrivalsData } from '@reducers/home/new-arrivals-slice';
import { ProductDetailNavigator} from '@constants/navigator/navigation-stack';

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
            <View style={{ marginRight: 3, marginTop: 10, marginStart: 10, marginEnd: 10 }}>
                <Text numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{ color: "#A9A9A9", fontSize: 12, fontWeight: '600', textAlign: 'center' }}>{categoriesStr}</Text>
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
                    style={{ color: Colors.black, fontSize: 13, fontWeight: '600', marginTop: 5, marginStart: 5, marginEnd: 5, textAlign: 'center' }}>{name}</Text>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ color: '#A9A9A9', fontSize: 12, fontWeight: '600', marginTop: 5, marginStart: 10 }}>Rs.{price}</Text>

            </View>
        </TouchableOpacity>
    );
}


const NewArrivals = ({ navigation }) => {

    const newArrivalsScreenState = useSelector((state) => state.newArrivalsData)
    const [initialLoading, setInitialLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        NetInfo.fetch().then((state) => {
            if (state.isConnected) {
                // Internet is connected, make API call
                dispatch(fetchNewArrivalsData()).then(() => {
                    setInitialLoading(false);
                });
            } else {
                // No internet connection, show a popup
                Alert.alert(
                    NO_INTENRT_CONNECTION,
                    CHECK_YOUR_INTERNET,
                    [{ text: OK, onPress: () => console.log('OK Pressed') }]
                );
                setInitialLoading(false); // Set loading to false so that the loader disappears
            }
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
        <RowItem prodId={item.id} name={item.name} price={item.price} categories={item.categories} image={item.images} navigation={navigation}/>
    );
    return (
        <View >
            <Text
                style={$newArrivalContainer}>{NEW_ARRIVALS}</Text>
            <View style={{ marginTop: 10 }}>
                <FlatList
                    data={newArrivalsScreenState.data ?? []}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>

    );
};

export default NewArrivals;