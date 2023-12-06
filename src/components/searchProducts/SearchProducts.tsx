import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    TextInput
} from 'react-native';
import { searchInuputContainer,userInputBox } from "@theme/view"
import {$userInputContainer} from '@theme/text'
import { ProductNavigator} from '@constants/navigator/navigation-stack';
import { APP_LOGO_URL,LABEL_IMAGE_NOT_FOUND } from '@constants/app-constants'

const SearchProducts = ({ navigation }) => {

    const [searchText, setSearchText] = useState("");

    const handleSearchClicked = () => {
        console.log("Search initiated with text:", searchText);
        if(searchText.length>0){
            navigation.navigate(ProductNavigator,{ searchText: searchText });
        }
    };
    
    return (
        <View >
            <Image source={{ uri: APP_LOGO_URL }} style={{
                        height: 50,
                        resizeMode: 'contain',
                    }} alt={LABEL_IMAGE_NOT_FOUND} />
            <View style={searchInuputContainer}>
                            <TextInput
                                style={[userInputBox, $userInputContainer]}
                                placeholder="Search Products"
                                onChangeText={(text) => setSearchText(text)}
                                onSubmitEditing={handleSearchClicked}
                                value={searchText}
                            />
                        </View>
            </View>

    );
};

export default SearchProducts;