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
import { categiryRowItem, noRecordParentView, textPrompt,forwardCategoryContainer,categoryListContainer,filterBottomContainer,filterBottomContent, productsContainer ,productsHeaderContainer,productListContainer } from "@theme/view"
import { $noRecordContainer } from '@theme/text'
import { ICategoryCard } from '@types/type';
import { ICategoriesResponse } from '@model/categories/CategoriesModel';
import { fetchSubCategoriesMoreData, clearSubCategoryData } from '@reducers/subCategories/subCategories-more-slice';
import { ProductNavigator } from '@constants/navigator/navigation-stack';
import { LABEL_NO_RECORD_FOUND, LoaderColor } from '@constants/app-constants'
import icForward from '@assets/images/ic_forward.png'

const RowItem = ({ categoryId, name, navigation }: ICategoryCard) => {

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(ProductNavigator,{ categoryId: categoryId,searchText: "" });
            }}
        >
            <View style={categiryRowItem}>
            <Text numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ color: Colors.black, fontSize: 13, fontWeight: '600', marginTop: 2, marginStart: 5, marginEnd: 5 }}>{name}</Text>
                   <View style={forwardCategoryContainer}>
                                <Image source={icForward} style={{ width: 10, height: 10, resizeMode: 'contain', tintColor: 'white' }} />
                            </View>
            </View>
        </TouchableOpacity>
    );
}


const SubCategoryMoreScreen = ({ route, navigation }) => {


    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const { categoryId } = route.params;

    const dispatch = useDispatch();

    const subCategoriesMoreScreenState = useSelector((state) => state.subCategoriesMoreData)
    const [page, setPage] = useState(1);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        console.log("categoryId "+categoryId)
        if (initialLoading) {
            dispatch(clearSubCategoryData());
            dispatch(fetchSubCategoriesMoreData({ categoryId: categoryId, pageNo: page})).then(() => {
                setInitialLoading(false);
            });
        }
        else if (!subCategoriesMoreScreenState.loading) {
            dispatch(fetchSubCategoriesMoreData({ categoryId: categoryId, pageNo: page})).then(() => {
                setLoadingMore(false);
            });
        }

    }, [dispatch,page]);


    const handleLoadMore = () => {
        if (!subCategoriesMoreScreenState.loading && subCategoriesMoreScreenState.pageData.length > 0) {
            console.log("handleLoadMore")
            setPage(page + 1);
            setLoadingMore(true);
        }
    };


    if (initialLoading) {
        // Show the initial loader in the center
        return (
            <View style={[textPrompt, { height: 260 }]}>
                <ActivityIndicator size="large" color={LoaderColor} />
            </View>
        );
    }
    if(subCategoriesMoreScreenState.error != ""){
        return(  <View style={textPrompt}>
                <Text>Error: {subCategoriesMoreScreenState.error}</Text>
            </View>
        );
    }

    const renderItem = ({ item }
        : ICategoriesResponse) => (
        <RowItem categoryId={item.id} name={item.name} navigation={navigation} />
    );


    return (
        <SafeAreaView style={backgroundStyle} >
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <View style={productsContainer}>
                {
                    subCategoriesMoreScreenState.data.length > 0 ? (
                        <View>
                           
                            <View style={categoryListContainer}>
                            <FlatList
                                data={subCategoriesMoreScreenState.data ?? []}
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

export default SubCategoryMoreScreen;