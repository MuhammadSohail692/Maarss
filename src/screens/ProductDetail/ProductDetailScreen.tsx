import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    useColorScheme,
    View,
    ActivityIndicator,
    Alert
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import ImageSlider from '@components/imageSlider/ImageSlider'
import ProductDescription from '@components/productDescription/ProductDescription'
import { useSelector, useDispatch } from 'react-redux';
import {  NO_INTENRT_CONNECTION, CHECK_YOUR_INTERNET, OK,LoaderColor } from '@constants/app-constants'
import NetInfo from '@react-native-community/netinfo';
import { textPrompt } from "@theme/view"
import { fetchProductDetailData } from '@reducers/productDetail/product-detail-slice';

const ProductDetailScreen = ({route,navigation}) => {

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    
    const productDetailScreenState = useSelector((state) => state.productDetail)
    const [initialLoading, setInitialLoading] = useState(true);
    const dispatch = useDispatch();

    const { productId } = route.params; 

    useEffect(() => {
        NetInfo.fetch().then((state) => {
            if (state.isConnected) {
                // Internet is connected, make API call
                dispatch(fetchProductDetailData({productsId:productId})).then(() => {
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

    return (
        <SafeAreaView style={backgroundStyle} >
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}
                style={[backgroundStyle]}>

                {/* Image Slider */}
                <ImageSlider imageList={productDetailScreenState.data.images ?? []} navigation={navigation} route={route}/>

                
                {/* Product desc */}
                <ProductDescription isDarkMode={isDarkMode} data={productDetailScreenState.data ?? []} navigation={navigation}/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProductDetailScreen;