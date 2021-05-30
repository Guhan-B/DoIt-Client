import { useNavigation, StackActions } from '@react-navigation/core';
import React, { useState, useRef } from 'react';
import { MaterialIndicator } from 'react-native-indicators';
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    FlatList,
    Animated,
    Easing
} from 'react-native';

import AvatarOne from '../../assets/avatars/1.svg';
import AvatarTwo from '../../assets/avatars/2.svg';
import AvatarThree from '../../assets/avatars/3.svg';
import AvatarFour from '../../assets/avatars/4.svg';
import AvatarFive from '../../assets/avatars/5.svg';
import NextArrow from '../../assets/icons/NextArrow.svg';

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');

const AVATARS = [
    {
        id: 1,
        Component: AvatarOne
    },
    {
        id: 2,
        Component: AvatarTwo
    },
    {
        id: 3,
        Component: AvatarThree
    },
    {
        id: 4,
        Component: AvatarFour
    },
    {
        id: 5,
        Component: AvatarFive
    },
];

const PostRegister = () => {
    const navigation = useNavigation();
    const scale = useRef(new Animated.Value(0)).current;
    const [avatar, setAvatar] = useState(AVATARS[0].id);
    const [isLoading, setIsLoading] = useState(false);

    const selectAvatar = (id) => {
        setAvatar(id);
    }

    const nextHandler = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigation.dispatch(StackActions.replace('Home'));
        }, 2000);
    }

    const lineAnimation = (to) => {
        return Animated.timing(scale, {
            toValue: to,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease
        });
    }

    return (
        <View style={styles.screen}>
            <View style={styles.greetings}>
                <Text style={styles.greetings_text_1}>Hello 👋</Text>
                <Text style={styles.greetings_text_2}>Welcome to DoIt.</Text>
            </View>
            <View style={{ width: '100%', marginBottom: 24 }}>
                <View style={{ height: 150, marginBottom: 48 }}>
                    <Text style={styles.avatar_text}>Pick an amazing avatar</Text>
                    <FlatList
                        horizontal
                        data={AVATARS}
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
                        bounces={false}
                        overScrollMode="never"
                        renderItem={({ item, index }) => {
                            const avatar_styles = {
                                ...styles.avatar_item,
                                borderColor: (item.id === avatar) ? '#a29bfe' : '#f4f4f4',
                            }
                            return (
                                <TouchableOpacity activeOpacity={0.8} style={avatar_styles} onPress={() => selectAvatar(item.id)}>
                                    <item.Component width={100} height={100} />
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
                <View style={styles.input_wrapper}>
                    <TextInput
                        style={styles.name_input}
                        placeholder="What's your name?"
                        placeholderTextColor="#b2bec3"
                        spellCheck={false}
                        onFocus={() => lineAnimation(1).start()}
                        onBlur={() => lineAnimation(0).start()}
                    />
                    <View style={styles.underline} >
                        <Animated.View style={[styles.underline_active, { transform: [{ scaleX: scale }] }]} />
                    </View>
                </View>
            </View>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={0.8} style={styles.next_button} onPress={nextHandler}>
                    {
                        (isLoading) ?
                            <MaterialIndicator color="#f4f4f4" /> :
                            <NextArrow width={15} />
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        width: WIDTH,
        height: HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 24
    },
    input_wrapper: {
        width: '100%',
        paddingHorizontal: 24,
    },
    name_input: {
        padding: 0,
        height: 50,
        width: '100%',
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: '#636e72',
        textAlignVertical: 'bottom',
        paddingBottom: 10
    },
    underline: {
        width: '100%',
        height: 2,
        backgroundColor: '#b2bec3',
        alignItems: 'center'
    },
    greetings: {
        alignSelf: 'flex-start',
        paddingTop: 18,
        paddingHorizontal: 24,
        width: '100%'

    },
    greetings_text_1: {
        fontFamily: 'Lato-Black',
        fontSize: 30,
        marginBottom: 12,
        color: '#2d3436'
    },
    greetings_text_2: {
        fontFamily: 'Lato-Black',
        fontSize: 22,
        color: '#2d3436'
    },
    avatar_text: {
        fontFamily: 'Lato-Bold',
        paddingHorizontal: 24,
        marginBottom: 24,
        fontSize: 16,
        color: '#b2bec3'
    },
    avatar_item: {
        borderRadius: 100,
        borderColor: '#f4f4f4',
        borderWidth: 2,
        width: 106,
        height: 106,
        alignItems: 'center',
        justifyContent: 'center'
    },
    next_button: {
        backgroundColor: '#6c5ce7',
        width: 70,
        height: 70,
        borderRadius: 200,
        marginBottom: 48,
        alignItems: 'center',
        justifyContent: 'center'
    },
    underline_active: {
        width: '100%',
        height: 2,
        backgroundColor: '#a29bfe',
    }
});

export default PostRegister;