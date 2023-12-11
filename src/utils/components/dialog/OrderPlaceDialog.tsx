import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, useColorScheme } from 'react-native';
import HTML from 'react-native-render-html';
import icClose from '@assets/images/ic_close.png'
import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
  
const OrderPlaceDialog = ({ visible, closeModal, message }) => {
    const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textStyles = {
      color: isDarkMode ? Colors.light : Colors.dark,
  };
   
    const htmlStyles = {
        p: {
            marginBottom: 10,
            color: textStyles.color,
        },
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView,backgroundStyle]}>
                    <View style={styles.closeContainer}>
                    <TouchableOpacity onPress={closeModal}>

                    <Image
                        source={icClose}
                        style={{
                            width: 18,
                            height: 18,
                            padding: 8,
                            marginBottom:18,
                            tintColor:textStyles.color
                        }}
                    />
                    </TouchableOpacity>
                    </View>
                    <HTML  source={{ html: message }} tagsStyles={htmlStyles} />
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        borderRadius: 10,
        padding: 10,
        paddingBottom:12,
        alignItems: 'center',
        elevation: 5,
        height:100,
    },
    closeContainer:{
        width:'60%',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'flex-end'
    }
});
export default OrderPlaceDialog;