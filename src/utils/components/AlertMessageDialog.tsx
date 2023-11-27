import React from 'react';
import { View,Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import HTML from 'react-native-render-html';

const AlertMessageDialog = ({ visible, closeModal,message }) => {
    const htmlStyles = {
        p: {
          marginBottom: 15,
          color: 'black',
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
            <View style={styles.modalView}>
              {/* <Text style={styles.modalText}>{message}</Text> */}
              <HTML source={{ html: message }} tagsStyles={htmlStyles} />
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
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
      padding:20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      elevation: 5,
    },
    closeButton: {
      marginTop: 8,
      padding: 8,
      borderRadius: 5,
      backgroundColor: 'lightblue',
    },
    closeButtonText: {
      textAlign: 'center',
      fontSize:13,
    },
  });
  export default AlertMessageDialog;