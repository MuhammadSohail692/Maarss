import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    TextInput,
    useColorScheme
} from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { searchInuputContainer,userInputBox } from "@theme/view"
import {$userInputContainer} from '@theme/text'
import { ProductNavigator} from '@constants/navigator/navigation-stack';
import { APP_LOGO_URL,LABEL_IMAGE_NOT_FOUND } from '@constants/app-constants'

const SearchProducts = ({ navigation }) => {

    const isDarkMode = useColorScheme() === 'dark';
    const textStyles = {
        color: isDarkMode ? "#111111" : "#111111",
    };
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
                                style={[userInputBox, $userInputContainer,{color:textStyles.color}]}
                                placeholder="Search Products"
                                placeholderTextColor={textStyles.color}
                                onChangeText={(text) => setSearchText(text)}
                                onSubmitEditing={handleSearchClicked}
                                value={searchText}
                            />
                        </View>
            </View>

    );
};

export default SearchProducts;