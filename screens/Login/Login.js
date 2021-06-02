import React, { useRef, useState } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    ToastAndroid
} from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Svg, Polygon } from 'react-native-svg';
import { DotIndicator } from 'react-native-indicators';

import Logo from '../../assets/icons/DOIT.svg';


const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');

const Login = () => {
    const navigation = useNavigation();

    const totalHeight = 250
    const lightCutHeight = 250;
    const darkCutHeight = 200;

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const switchMode = () => {
        navigation.dispatch(StackActions.replace('Register'));
    }

    const loginHandler = () => {
        setIsLoading(true);
        ToastAndroid.showWithGravityAndOffset("Authenticating",ToastAndroid.SHORT,ToastAndroid.BOTTOM,0,HEIGHT*0.5);
        setTimeout(()=>{
            setIsLoading(false);
            navigation.dispatch(StackActions.replace('Home'));
        },2000);
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
                        style={styles.form_field}
                        placeholder={"Email"}
                        selectionColor="#a29bfe"
                        placeholderTextColor={"#b2bec3"}
                        spellCheck={false}
                        keyboardAppearance="default"
                        keyboardType="email-address"
                        blurOnSubmit={true}
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />
                    <TextInput
                        ref={passwordRef}
                        style={styles.form_field}
                        placeholder={"Password"}
                        selectionColor="#a29bfe"
                        placeholderTextColor={"#b2bec3"}
                        spellCheck={false}
                        keyboardAppearance="default"
                        secureTextEntry={true}
                        blurOnSubmit={true}
                    />
                    <Text style={styles.forgot_text}>
                        Forgot Password?
                    </Text>
                </View>
                <View>
                    <Text style={styles.else_text} onPress={switchMode}>
                        New to DoIt? Register here
                    </Text>
                    <TouchableOpacity disabled={isLoading} style={styles.button} activeOpacity={0.9} onPress={loginHandler}>
                        {
                            (isLoading) ?
                                <DotIndicator color="white" size={6} /> :
                                <Text style={{ fontFamily: 'Lato-Bold', color: '#f4f4f4', fontSize: 18, marginBottom: 8 }}>Login</Text>
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

export default Login;