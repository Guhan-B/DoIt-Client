import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-raw-bottom-sheet';

import { logout } from '../../../store/authentication/action';

const HomeMoreModal = ({ setRef, close }) => {
    const navigation = useNavigation();

    const tokens = useSelector(state => state.auth.tokens)

    const dispatch = useDispatch();

    const logoutHandler = () => {
        close();
        dispatch(logout(tokens.access, tokens.refresh));
    }

    return (
        <Modal
            customStyles={{ container: { paddingHorizontal: 12, borderTopLeftRadius: 20, borderTopRightRadius: 20 } }}
            closeOnDragDown={true}
            ref={setRef}
            height={140}
        >
            <View style={styles.more_container}>
                <TouchableOpacity activeOpacity={0.8} style={styles.option}>
                    <Text style={styles.option_text}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.option} onPress={logoutHandler}>
                    <Text style={{ ...styles.option_text, color: '#d63031' }}>Logout...</Text>
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
    option_text: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: '#2d3436'
    }
});

export default HomeMoreModal;