import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import Modal from 'react-native-raw-bottom-sheet';

const HomeMoreModal = ({ setRef, close }) => {
    const navigation = useNavigation();

    const callClose = () => {
        close();
    }

    const logoutHandler = () => {
        close();
        navigation.dispatch(StackActions.replace('Login'));
    }

    return (
        <Modal
            customStyles={{ container: { paddingHorizontal: 12, borderTopLeftRadius: 20, borderTopRightRadius: 20 } }}
            closeOnDragDown={true}
            ref={setRef}
            height={140}
        >
            <View style={styles.more_container}>
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.option_text}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={logoutHandler}>
                    <Text style={{...styles.option_text, color: '#d63031'}}>Logout...</Text>
                </TouchableOpacity>
            </View>
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
    },
    option: {
        paddingVertical: 18,
        // backgroundColor: 'red'
    },
    option_text:{
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: '#2d3436'
    }
});

export default HomeMoreModal;