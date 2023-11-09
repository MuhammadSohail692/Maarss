import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { screenContainer } from "@theme/view"
import { $cardTextTitle } from "@theme/text"

const SettingScreen = () => {

    return (
        <View
            style={[
                screenContainer,
            ]}
        >
            <Text style={$cardTextTitle}>Setting Screen</Text>
        </View>
    );
};

export default SettingScreen;