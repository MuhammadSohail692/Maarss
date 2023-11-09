import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import { $activeDot, $dot } from '@theme/text'
import { pagination, fullScreenView } from '@theme/view'
import { IProductDetailFullScreenImage } from '@types/type'
import icZoom from '@assets/images/ic_zoom.png'
import {FullScreenImageViewerNavigator} from '@constants/navigator/navigation-stack';

const ImageSlider = ({ imageList,navigation,route }: IProductDetailFullScreenImage) => {

    const { width } = Dimensions.get('window');
    const height = width * 0.7;

    const [active, setActive] = useState(0);

    const onScrollChange = ({ nativeEvent }: any) => {
        const slide = Math.ceil(
            nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
        );
        if (slide !== active) {
            setActive(slide);
        }
    };

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <ScrollView
                pagingEnabled
                horizontal
                onScroll={onScrollChange}
                showsHorizontalScrollIndicator={false}
                style={{ width, height, backgroundColor: '#ffffff' }}>
                {imageList.map((image, index) => (
                    <Image
                        key={index}
                        source={{ uri: image.src }}
                        style={{ width, height, resizeMode: 'contain' }}
                    />
                ))}
            </ScrollView>
            <View style={pagination}>
                {imageList.map((i, k) => (
                    <Text key={k} style={k == active ? $activeDot : $dot}>
                        •
                    </Text>
                ))}
            </View>
            <View style={fullScreenView}>
            <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(FullScreenImageViewerNavigator,{ imageList: imageList });
                    }}
                >
                <Image source={icZoom} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ImageSlider;
