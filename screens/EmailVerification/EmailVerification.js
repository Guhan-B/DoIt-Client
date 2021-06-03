import { StackActions, useNavigation } from '@react-navigation/core';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, ToastAndroid, Keyboard } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import { useSelector, useDispatch } from 'react-redux';

import { generateOTP, verifyOTP } from '../../store/verification/action';

const { width: WIDTH } = Dimensions.get('window');

const EmailVerification = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);

    const user = useSelector(state => state.user);
    const error = useSelector(state => state.verify.error);
    const loading = useSelector(state => state.verify.loading);
    const tip = useSelector(state => state.verify.tip);
    const id = useSelector(state => state.verify.verificationId);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(generateOTP(user._id));
    }, [])

    useEffect(() => {
        if (error) {
            ToastAndroid.show(error, ToastAndroid.SHORT);
        }
    }, [error]);

    const profileUpdate = () => {
        navigation.dispatch(StackActions.replace("ProfileUpdate"));
    }

    const verifyHandler = () => {

        for (let digit of otp) {
            if (!digit) {
                return;
            }
        }

        const result = Number.parseInt(otp.reduce((acc, next) => Number.parseInt(acc) * 10 + Number.parseInt(next)));

        dispatch(verifyOTP(id, result, profileUpdate))
    }

    const resendHandler = () => {
        dispatch(generateOTP(user._id));
    }

    const onChangeText = (ref, value, index) => {
        if (value) {
            if (ref) {
                ref.current.focus();
            }
        }
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    }

    return (
        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()} style={styles.screen}>
            <View style={styles.header}>
                <View style={styles.header_text}>
                    <Text style={styles.header_text_1}>Email Verification</Text>
                    <Text style={styles.header_text_2}>An OTP has be sent to the registered email</Text>
                </View>
                <View style={styles.otp_input}>
                    <TextInput
                        selectionColor="#a29bfe"
                        ref={ref1}
                        value={otp[0]}
                        onChangeText={(v) => onChangeText(ref2, v, 0)}
                        keyboardType="number-pad"
                        maxLength={1}
                        style={styles.input_field}
                    />
                    <TextInput
                        selectionColor="#a29bfe"
                        ref={ref2}
                        value={otp[1]}
                        onChangeText={(v) => onChangeText(ref3, v, 1)}
                        keyboardType="number-pad"
                        maxLength={1}
                        style={styles.input_field}
                    />
                    <TextInput
                        selectionColor="#a29bfe"
                        ref={ref3}
                        value={otp[2]}
                        onChangeText={(v) => onChangeText(ref4, v, 2)}
                        keyboardType="number-pad"
                        maxLength={1}
                        style={styles.input_field}
                    />
                    <TextInput
                        selectionColor="#a29bfe"
                        ref={ref4}
                        value={otp[3]}
                        onChangeText={(v) => onChangeText(null, v, 3)}
                        keyboardType="number-pad"
                        maxLength={1}
                        style={styles.input_field}
                    />
                </View>
                <Text style={styles.timer_text}>{tip}</Text>
                <Text style={styles.resend_text} onPress={resendHandler}>Did not recieve the OTP? Send again</Text>
            </View>
            <TouchableOpacity disabled={loading} style={styles.button} activeOpacity={0.9} onPress={verifyHandler}>
                {
                    (loading) ?
                        <DotIndicator color="white" size={6} /> :
                        <Text style={{ fontFamily: 'Lato-Bold', color: '#f4f4f4', fontSize: 18, marginBottom: 0 }}>Verify OTP</Text>
                }
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default EmailVerification;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    header: {
        width: WIDTH,
        paddingHorizontal: 24,
        paddingVertical: 28
    },
    header_text_1: {
        fontFamily: 'Lato-Bold',
        color: '#2d3436',
        fontSize: 24,
        marginBottom: 8
    },
    header_text_2: {
        fontFamily: 'Lato-Regular',
        color: '#2d3436',
        fontSize: 14,
        marginBottom: 8
    },
    timer_text: {
        fontFamily: 'Lato-Regular',
        color: '#636e72',
        fontSize: 13,
        marginBottom: 24
    },
    resend_text: {
        fontFamily: 'Lato-Bold',
        color: '#6c5ce7',
        fontSize: 14,
        textDecorationLine: 'underline'
    },
    button: {
        backgroundColor: '#6c5ce7',
        width: WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60
    },
    otp_input: {
        flexDirection: 'row',
        marginTop: 18,
        marginBottom: 10
    },
    input_field: {
        backgroundColor: '#dfe6e9',
        padding: 0,
        width: 60,
        height: 55,
        marginRight: 8,
        borderRadius: 4,
        color: '#2d3436',
        fontSize: 22,
        fontFamily: 'Lato-Bold',
        textAlign: 'center',
        // marginBottom: 24
    }
})
