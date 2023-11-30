import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { textPrompt } from "@theme/view"
import { LoaderColor } from '@constants/app-constants'
import { modalBackground,activityIndicatorWrapper } from '@theme/view'

const BlurLoader = ({ loading }) => {
    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={loading}
            onRequestClose={() => { }}>
            <View style={modalBackground}>
                <View style={activityIndicatorWrapper}>
                        <ActivityIndicator size="large" color={LoaderColor} />
                </View>
            </View>
        </Modal>
    );
};

export default BlurLoader;