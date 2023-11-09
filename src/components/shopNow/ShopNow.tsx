import React from 'react';
import {
    View,
    FlatList,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { item, shopNowBtn, contentContainer } from "@theme/view"
import { IShopNowCard } from '@types/type'
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { LABEL_IMAGE_NOT_FOUND } from '@constants/app-constants'

const RowItem = ({ id, title, desc, bgImage }: IShopNowCard) => {
    return (
        <View style={item}>
            <Image
                source={{ uri: bgImage }}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', resizeMode: 'cover' }}
                alt={LABEL_IMAGE_NOT_FOUND}
            />
            <View style={contentContainer}>
                <Text
                    style={{ color: Colors.white, fontSize: 16, fontWeight: '700', marginEnd: 5 }}>{title}</Text>
                <Text
                    style={{ color: "#FFFFEF", fontSize: 12, fontWeight: '500', }}>{desc}</Text>
                <TouchableOpacity
                    onPress={() => {
                    }}
                >
                    <View style={shopNowBtn}>
                        <Text
                            style={{ color: '#ffffff', fontSize: 12, fontWeight: '800', }}>Shop Now</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const ShopNow = () => {

    var shopNowList = [
        {
            "id": "1",
            "title": "For Her",
            "desc": "Stitched For Modern Women",
            "bgImage": "https://maarss.com/wp-content/uploads/2021/04/dbb6ea843810b8da5de8bb2fa146254c.jpg"
        },
        {
            "id": "2",
            "title": "For Him",
            "desc": "Stretch In Soft And DurableFibers",
            "bgImage": "https://maarss.com/wp-content/uploads/2021/04/afbb1c2170df1c2523c3649eadb161fc.jpg"
        },
        {
            "id": "3",
            "title": "For Kids",
            "desc": "A delightfull collection for the little one",
            "bgImage": "https://maarss.com/wp-content/uploads/2021/04/28a37a680294383c7fee744f54059973.jpg"
        },
    ];

    const renderItem = ({item}) => (
        <RowItem id={item.id} title={item.title} desc={item.desc} bgImage={item.bgImage} />
    );
    return (
        <FlatList
            data={shopNowList ?? []}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default ShopNow;
