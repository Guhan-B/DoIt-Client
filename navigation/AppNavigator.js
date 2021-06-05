import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, } from '@react-navigation/stack';
import { NavigationContainer, } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import SplashScreen from '../screens/Splash/Splash';
import HomeScreen from '../screens/Home/Home';
import TasksScreen from '../screens/Tasks/Tasks';
import RegisterScreen from '../screens/Register/Register';
import LoginScreen from '../screens/Login/Login';
import PostRegisterScreen from '../screens/PostRegister/PostRegister';
import EmailVerificationScreen from '../screens/EmailVerification/EmailVerification';
import BackBlack from '../assets/icons/BackArrowBlack.png';
import { start } from '../store/app/action';

const RootStack = createStackNavigator();

const splashScreen = () => {
    return (
        <>
            <RootStack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
        </>
    );
}

const authScreens = () => {
    return (
        <>
            <RootStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="EmailVerification" component={EmailVerificationScreen} options={{ headerShown: false }} />
        </>
    );
}

const appScreens = () => {
    return (
        <>
            <RootStack.Screen name="Home" component={HomeScreen} />
            <RootStack.Screen name="ProfileUpdate" component={PostRegisterScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="Tasks" component={TasksScreen} options={({ route, navigation }) => {
                return {
                    headerStyle: {
                        backgroundColor: '#f4f4f4',
                        shadowColor: '#6c5ce7'
                    },
                    headerTitleStyle: {
                        fontFamily: 'Lato-Bold',
                        color: '#2d3436'
                    },
                    headerTitleAlign: 'center',
                    headerPressColorAndroid: 'transparent',
                    headerBackImage: () => <Image source={BackBlack} style={{ width: 10, height: 15 }} resizeMode="contain" />,
                }
            }} />
        </>
    );
}




export default RootNavigator = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const loadingApp = useSelector(state => state.app.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(start());
    }, [])

    useEffect(() => {
        console.log(isAuthenticated);
    }, [isAuthenticated]);

    return (
        <NavigationContainer>
            <RootStack.Navigator
                initialRouteName={(isAuthenticated) ? "Home" : "Register"}

                screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
            >
                {(loadingApp) ? splashScreen() : (isAuthenticated) ? appScreens() : authScreens()}
            </RootStack.Navigator>
        </NavigationContainer>
    );
}