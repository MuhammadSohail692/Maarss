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
import { bestfavoriteRowItem,noRecordParentView,headerContiner } from "@theme/view"
import { $favouriteLabelContainer, $noRecordContainer } from '@theme/text'
import { IBestSellingProductCard } from '@types/type';
import { LABEL_IMAGE_NOT_FOUND, FAVOURITE_LABEL, LABEL_NO_RECORD_FOUND } from '@constants/app-constants'
import { IBestSellingProductRespose } from '@model/home/bestSellingProductModel/BestSellingProductModel';
import { ProductDetailNavigator } from '@constants/navigator/navigation-stack';
import { favFlatListCartContainer } from "@theme/view"

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


const FavouriteListing = ({ isDarkMode,favouriteList, navigation }) => {

    
    const textStyles = {
        color: isDarkMode ? Colors.light : Colors.dark,
    };
    const renderItem = ({ item }
        : IBestSellingProductRespose) => (
        <RowItem prodId={item.id} name={item.name} price={item.price} categories={item.categories} image={item.images} navigation={navigation} />
    );
    return (
        <View>
            <View style={[headerContiner]}>
            <Text style={[$favouriteLabelContainer,textStyles]}>{FAVOURITE_LABEL}</Text>
            </View>
            {
                favouriteList.length > 0 ? (
                    <View style={{ marginTop: 15 }}>
                        <FlatList
                            data={favouriteList ?? []}
                            renderItem={renderItem}
                            contentContainerStyle={favFlatListCartContainer}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                ) : (
                <View style={[ noRecordParentView]}>
                <Text style={[$noRecordContainer,textStyles]}>{LABEL_NO_RECORD_FOUND}</Text>
                </View>)
            }

        </View>

    );
};

export default FavouriteListing;