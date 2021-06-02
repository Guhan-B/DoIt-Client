import React, { useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { DotIndicator } from 'react-native-indicators';


import Logo from '../../assets/icons/DOIT.svg';

const Splash = () => {

    const scale = useRef(new Animated.Value(0)).current;

    const scaleAnimation = (to) => {
        return Animated.spring(scale, {
            toValue: to,
            useNativeDriver: true
        })
    }

    useEffect(() => {
        scaleAnimation(1).start();
    }, [])

    return (
        <View style={styles.screen}>
            <Animated.View style={{ transform: [{ scale }] }}>
                <Logo height={38} />
            </Animated.View>
            <DotIndicator style={{ position: 'absolute', bottom: 25 }} color="white" size={6} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#6c5ce7',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Splash
