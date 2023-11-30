import React from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import { modalBackground, activityIndicatorWrapper } from '@theme/view'

const Loader = ({ loading }) => {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={loading}
      onRequestClose={() => {}}>
      <View style={modalBackground}>
        <View style={activityIndicatorWrapper}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;