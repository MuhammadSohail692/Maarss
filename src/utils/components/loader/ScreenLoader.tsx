import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { textPrompt } from "@theme/view"
import { LoaderColor } from '@constants/app-constants'

const ScreenLoader = ({ loading }) => {
    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={loading}
            onRequestClose={() => { }}>
            <View style={[textPrompt, { height: 260 }]}>
                <ActivityIndicator size="large" color={LoaderColor} />
            </View>
        </Modal>
    );
};

export default ScreenLoader;