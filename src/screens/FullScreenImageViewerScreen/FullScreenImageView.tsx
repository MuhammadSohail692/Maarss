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

const FullScreenImageView = ({route,navigation}) => {

    const  width  = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const [active, setActive] = useState(0);

    const { imageList }:IProductDetailFullScreenImage = route.params; 

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
        </View>
    );
};

export default FullScreenImageView;
