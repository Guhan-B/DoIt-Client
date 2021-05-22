import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import Tabs from './components/Tabs';
import AddLogModal from './components/AddLogModal';

import ThreeDots from '../../assets/icons/ThreeDots.png';
const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');
const IMAGE_URL = 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80';


const Home = () => {
    let modelRef = useRef(null);
    const setModelRef = (ref) => modelRef = ref;

    const openAddLogModel = () => {
        modelRef.open();
    }

    const closeAddLogModel = () => {
        modelRef.close();
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
                    <Tabs openModel={openAddLogModel} />
                </View>
            </View>
            <AddLogModal setRef={setModelRef} close={closeAddLogModel} />
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
        width: 15,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    }
});

export default Home;