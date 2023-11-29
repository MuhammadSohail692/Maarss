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
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import { bestfavoriteRowItem, noRecordParentView, textPrompt, filterContainer, rowFilterContainer, filtersBox, filterBottomContainer, filterBottomContent, productsContainer, productsHeaderContainer, productListContainer } from "@theme/view"
import { $noRecordContainer, $productsLabelContainer, $filterLabel } from '@theme/text'
import { IBestSellingProductCard } from '@types/type';
import { IBestSellingProductRespose } from '@model/home/bestSellingProductModel/BestSellingProductModel';
import { fetchProductData, clearProductData } from '@reducers/product/product-slice';
import { ProductDetailNavigator } from '@constants/navigator/navigation-stack';
import { LABEL_IMAGE_NOT_FOUND, LABEL_NO_RECORD_FOUND, LoaderColor, PRODUCTS_LABEL } from '@constants/app-constants'
import icFilter from '@assets/images/ic_filter.png'

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
                        style={{ color: Colors.black, fontSize: 13, fontWeight: '600', marginTop: 2, marginStart: 12, marginEnd: 5 }}>{name}</Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ color: '#A9A9A9', fontSize: 12, fontWeight: '600', marginTop: 2, marginStart: 12 }}>Rs.{price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}


const ProductScreen = ({ route, navigation }) => {


    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const dispatch = useDispatch();

    const productScreenState = useSelector((state) => state.productData)
    const [page, setPage] = useState(1);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedFilterValue, setSelectedValue] = useState({
        id: 'date',
        order: 'desc',
        title: 'Sort by latest',
    },);

    const { categoryId, searchText } = route.params;
    console.log("prodcts " + categoryId)
    console.log("searchText " + searchText)

    const filterList = [
        {
            id: 'date',
            order: 'desc',
            title: 'Sort by latest',
        },
        {
            id: 'popularity',
            order: 'desc',
            title: 'Sort by poularity',
        },
        {
            id: 'rating',
            order: 'desc',
            title: 'Sort by average rating',
        },
        {
            id: 'price',
            order: 'asc',
            title: 'Sort by price: low to high',
        },
        {
            id: 'price',
            order: 'desc',
            title: 'Sort by price: high to low',
        },
    ];

    useEffect(() => {
        if (initialLoading) {
            dispatch(clearProductData());
            dispatch(fetchProductData({ categoryId: categoryId, pageNo: page, selectedOrderBy: selectedFilterValue.id, order: selectedFilterValue.order, searchText: searchText })).then(() => {
                setInitialLoading(false);
            });
        }
        else if (!productScreenState.loading) {
            dispatch(fetchProductData({ categoryId: categoryId, pageNo: page, selectedOrderBy: selectedFilterValue.id, order: selectedFilterValue.order, searchText: searchText }));
        }

    }, [dispatch, page]);


    const handleLoadMore = () => {
        if (!productScreenState.loading && productScreenState.pageData.length > 0) {
            console.log("handleLoadMore")
            setPage(page + 1);
            setLoadingMore(true);
        }
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSelect = (value) => {
        dispatch(clearProductData());
        setPage(1);
        setSelectedValue(value);
        toggleModal();
        setInitialLoading(true);
        dispatch(fetchProductData({
            categoryId: categoryId,
            pageNo: 1,
            selectedOrderBy: value.id,
            order: value.order,
            searchText: searchText
        })).then(() => {
            setInitialLoading(false);
        });
    };

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
                        <View>
                            <View style={productsHeaderContainer}>
                                <Text style={$productsLabelContainer}>{PRODUCTS_LABEL}</Text>

                                <TouchableOpacity onPress={toggleModal}>
                                    <View style={filterContainer}>
                                        <Image source={icFilter} style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: 'white' }} />
                                    </View>
                                </TouchableOpacity>


                            </View>
                            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={filterBottomContainer}>
                                <View style={filterBottomContent}>
                                    {filterList.map((item) => (
                                        <TouchableOpacity key={item.id} onPress={() => handleSelect(item)}>
                                            <Text style={rowFilterContainer}>{item.title}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </Modal>
                            <View style={productListContainer}>
                                <FlatList
                                    data={productScreenState.data ?? []}
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

export default ProductScreen;