import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Modal from 'react-native-raw-bottom-sheet';

const AddLogModal = ({ setRef, close }) => {
    const callClose = () => {
        close();
    }

    return (
        <Modal
            customStyles={{ container: { paddingHorizontal: 12, borderTopLeftRadius: 20, borderTopRightRadius: 20 } }}
            closeOnDragDown={true}
            ref={setRef}
            height={400}
        >
            
        </Modal>
    );
}

const styles = StyleSheet.create({
    controls: {
        flexDirection: 'row',
        marginTop: 32
    },
    primary_button: {
        backgroundColor: '#6c5ce7',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 45,
        marginRight: 8
    },
    secondary_button: {
        backgroundColor: '#f0f0f0',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 45,
        marginLeft: 8
    }
});

export default AddLogModal;