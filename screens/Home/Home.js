import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { BallIndicator, DotIndicator } from 'react-native-indicators';

import Tabs from './components/Tabs';
import AddLogModal from './components/AddLogModal';
import MoreModal from './components/MoreModal';

import ThreeDotsWhite from '../../assets/icons/ThreeDots.png';
import ThreeDots from '../../assets/icons/ThreeDots.svg';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');
const IMAGE_URL = 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80';


const Home = () => {
    let addModalRef = useRef(null);
    let moreModalRef = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#6c5ce7',
                elevation: 0,
            },
            headerTitleStyle: {
                fontFamily: 'Lato-Bold',
                color: '#f4f4f4'
            },
            headerRight: () => {
                return (
                    <TouchableOpacity style={styles.more_button} onPress={openMoreModal}>
                        <Image source={ThreeDotsWhite} style={{ width: 5, height: 17 }} resizeMode="contain" />
                    </TouchableOpacity>
                );
            }
        });
    }, []);

    const setAddModalRef = (ref) => addModalRef = ref;
    const setMoreModalRef = (ref) => moreModalRef = ref;

    const openAddLogModal = () => {
        addModalRef.open();
    }

    const closeAddLogModal = () => {
        addModalRef.close();
    }

    const openMoreModal = () => {
        moreModalRef.open();
    }

    const closeMoreModal = () => {
        moreModalRef.close();
    }

    return (
        <>
            <View style={styles.screen}>
                <View style={styles.home_header}>
                    <View style={styles.header_greeting}>
                        <Image source={{ uri: IMAGE_URL }} style={styles.profile_image} />
                        <View style={styles.welcome_text}>
                            <Text style={styles.name_text}>Hi, Jiff Kimson</Text>
                            <Text style={styles.greeting_text}>You have 15 tasks pending</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.home_body}>
                    <Tabs openModel={openAddLogModal} />
                </View>
            </View>
            <AddLogModal setRef={setAddModalRef} close={closeAddLogModal} />
            <MoreModal setRef={setMoreModalRef} close={closeMoreModal} />
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: '#F4F4F4',
    },
    home_header: {
        width: WIDTH,
        backgroundColor: '#6c5ce7',
        paddingHorizontal: 12,
        paddingVertical: 28
    },
    home_body: {
        width: WIDTH,
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    profile_image: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 12
    },
    welcome_text: {
        alignItems: 'center'
    },
    name_text: {
        color: '#F4F4F4',
        fontFamily: 'Lato-Black',
        fontSize: 22,
        marginBottom: 6
    },
    greeting_text: {
        color: '#dfe6e9',
        fontFamily: 'Lato-Regular',
        fontSize: 16
    },
    header_greeting: {
        flexDirection: 'column',
        alignItems: 'center',
        // marginTop: 18
    },
    screen_name: {
        color: '#f4f4f4',
        fontFamily: 'Lato-Bold',
        fontSize: 17
    },
    navbar: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#6c5ce7'
    },
    more_button: {
        marginRight: 22,
        height: '70%',
        width: 30,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
});

export default Home;

