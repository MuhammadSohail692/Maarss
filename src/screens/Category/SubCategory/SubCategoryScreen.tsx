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
import { categiryRowItem, noRecordParentView, textPrompt,forwardCategoryContainer,categoryListContainer, categoryContainer } from "@theme/view"
import { $noRecordContainer } from '@theme/text'
import { ICategoryCard } from '@types/type';
import { ICategoriesResponse } from '@model/categories/CategoriesModel';
import { fetchSubCategoriesData, clearSubCategoryData } from '@reducers/subCategories/subcategories-slice';
import { fetchSubCategoriesMoreData } from '@reducers/subCategories/subCategories-more-slice';
import { SubCategoryMoreNavigator,ProductNavigator } from '@constants/navigator/navigation-stack';
import { LABEL_NO_RECORD_FOUND, LoaderColor } from '@constants/app-constants'
import icForward from '@assets/images/ic_forward.png'
import ScreenLoader from '@utils/components/loader/ScreenLoader'

const SubCategoryScreen = ({ route, navigation }) => {


    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const textStyles = {
        color: isDarkMode ? Colors.light : Colors.dark,
    };
    const { categoryId } = route.params;

    const dispatch = useDispatch();

    const subCategoriesScreenState = useSelector((state) => state.subCategoriesData)
    const [page, setPage] = useState(1);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [categoryClicked, isCategoryClicked] = useState(false);

    useEffect(() => {
        console.log("categoryId "+categoryId)
        if (initialLoading) {
            dispatch(clearSubCategoryData());
            dispatch(fetchSubCategoriesData({ categoryId: categoryId, pageNo: page})).then(() => {
                setInitialLoading(false);
            });
        }
        else if (!subCategoriesScreenState.loading) {
            dispatch(fetchSubCategoriesData({ categoryId: categoryId, pageNo: page})).then(() => {
                setLoadingMore(false);
            });
        }

    }, [dispatch,page]);


    const handleTapClicked = (value) => {
        isCategoryClicked(true)
        dispatch(fetchSubCategoriesMoreData({categoryId: value, pageNo: 1})).then((response) => {
            isCategoryClicked(false)

            if(response.payload!=null && response.payload.length>0){                    
                navigation.navigate(SubCategoryMoreNavigator, { categoryId: value });
            }else{
                navigation.navigate(ProductNavigator,{ categoryId: value,searchText: "" });
            }
        });
    };

    const handleLoadMore = () => {
        if (!subCategoriesScreenState.loading && subCategoriesScreenState.pageData.length > 0) {
            console.log("handleLoadMore")
            setPage(page + 1);
            setLoadingMore(true);
        }
    };

    const RowItem = ({ categoryId, name, navigation }: ICategoryCard) => {

        return (
            <TouchableOpacity
                onPress={() => {
                    handleTapClicked(categoryId)
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
    
    if (initialLoading) {
        // Show the initial loader in the center
        return (
            <View style={[textPrompt, { height: 260 }]}>
                <ActivityIndicator size="large" color={LoaderColor} />
            </View>
        );
    }

    if(subCategoriesScreenState.error != ""){
        return(  <View style={textPrompt}>
                <Text style={textStyles}>Error: {subCategoriesScreenState.error}</Text>
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
           <ScreenLoader loading={categoryClicked} />

            <View style={categoryContainer}>
                {
                    subCategoriesScreenState.data.length > 0 ? (
                        <View>
                           
                            <View style={categoryListContainer}>
                            <FlatList
                                data={subCategoriesScreenState.data ?? []}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={false}
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
                            <Text style={[$noRecordContainer,textStyles]}>{LABEL_NO_RECORD_FOUND}</Text>
                        </View>)
                }
            </View>
        </SafeAreaView>
    );
};

export default SubCategoryScreen;