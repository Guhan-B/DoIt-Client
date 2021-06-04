import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { Svg, Polygon } from 'react-native-svg';
import { DotIndicator } from 'react-native-indicators';
import { useNavigation, StackActions } from '@react-navigation/native';
import validator from 'validator';

import Logo from '../../assets/icons/DOIT.svg';
import { register } from '../../store/authentication/action';

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');
const totalHeight = 250
const lightCutHeight = 250;
const darkCutHeight = 200;

const Register = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);

    const errorHandler = (error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
    }

    const doVerification = () => {
        navigation.dispatch(StackActions.replace('EmailVerification'));
    }

    const switchMode = () => {
        navigation.dispatch(StackActions.replace('Login'));
    }

    const registerHandler = () => {
        if (password === "" || confirmPassword === "" || email === "") {
            return ToastAndroid.show("Credentials cannot be empty", ToastAndroid.SHORT);
        }

        if (password.length < 6) {
            return ToastAndroid.show("Password atleast 6 characters", ToastAndroid.SHORT)
        }

        if (!validator.isEmail(email)) {
            return ToastAndroid.show("Email is invalid", ToastAndroid.SHORT);
        }

        if (password !== confirmPassword) {
            return ToastAndroid.show("Password dosen't match", ToastAndroid.SHORT);
        }

        dispatch(register({ email, password }, doVerification, errorHandler));
    }

    return (
        <KeyboardAvoidingView>
            <TouchableOpacity activeOpacity={1} style={styles.screen} onPress={() => Keyboard.dismiss()}>
                <Svg width={WIDTH} height={totalHeight} viewBox={`0 0 ${WIDTH} ${totalHeight}`} fill="none">
                    <Polygon
                        fill="#6c5ce7"
                        points={`0,0 ${WIDTH},0 ${WIDTH},${lightCutHeight} 0,${lightCutHeight - 110}`}
                        fillOpacity="0.4"
                    />
                    <Polygon
                        fill="#6c5ce7"
                        points={`0,0 ${WIDTH},0 ${WIDTH},${darkCutHeight} 0,${darkCutHeight - 70}`}
                    />
                </Svg>
                <View style={{ position: 'absolute', width: WIDTH, height: 30, top: 60, left: 0, alignItems: 'center' }}>
                    <Logo height={40} />
                </View>
                <View style={styles.form}>
                    <TextInput
                        ref={emailRef}
                        value={email}
                        style={styles.form_field}
                        placeholder={"Email"}
                        selectionColor="#a29bfe"
                        placeholderTextColor={"#b2bec3"}
                        spellCheck={false}
                        keyboardAppearance="default"
                        keyboardType="email-address"
                        blurOnSubmit={true}
                        onSubmitEditing={() => passwordRef.current.focus()}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        ref={passwordRef}
                        value={password}
                        style={styles.form_field}
                        placeholder={"Password"}
                        selectionColor="#a29bfe"
                        placeholderTextColor={"#b2bec3"}
                        spellCheck={false}
                        keyboardAppearance="default"
                        secureTextEntry={true}
                        blurOnSubmit={true}
                        onSubmitEditing={() => confirmPasswordRef.current.focus()}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TextInput
                        ref={confirmPasswordRef}
                        value={confirmPassword}
                        style={styles.form_field}
                        placeholder={"Confirm Password"}
                        selectionColor="#a29bfe"
                        placeholderTextColor={"#b2bec3"}
                        spellCheck={false}
                        keyboardAppearance="default"
                        secureTextEntry={true}
                        blurOnSubmit={true}
                        onChangeText={(text) => setConfirmPassword(text)}
                    />
                    <Text style={styles.forgot_text}>
                        Forgot Password?
                    </Text>
                </View>
                <View>
                    <Text style={styles.else_text} onPress={switchMode}>
                        Already have an account? Login here
                    </Text>
                    <TouchableOpacity disabled={loading} style={styles.button} activeOpacity={0.9} onPress={registerHandler}>
                        {
                            (loading) ?
                                <DotIndicator color="white" size={6} /> :
                                <Text style={{ fontFamily: 'Lato-Bold', color: '#f4f4f4', fontSize: 18, marginBottom: 8 }}>
                                    Register
                                </Text>
                        }
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        width: WIDTH,
        height: HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#6c5ce7',
        width: WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60
    },
    else_text: {
        fontFamily: 'Lato-Bold',
        color: '#2d3436',
        fontSize: 12,
        textDecorationLine: "underline",
        textAlign: 'center',
        marginBottom: 18
    },
    form: {
        flex: 1,
        width: WIDTH,
        alignItems: 'center',
        paddingTop: 28
    },
    form_field: {
        backgroundColor: '#dfe6e9',
        width: '75%',
        paddingHorizontal: 12,
        paddingVertical: 8,
        color: '#2d3436',
        borderRadius: 4,
        marginBottom: 8
    },
    forgot_text: {
        fontFamily: 'Lato-Regular',
        color: '#636e72',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 18,
        marginTop: 12
    },
});

export default Register;