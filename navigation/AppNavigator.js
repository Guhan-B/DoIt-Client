import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, } from '@react-navigation/stack';
import { NavigationContainer, } from '@react-navigation/native';

import HomeScreen from '../screens/Home/Home';
import TasksScreen from '../screens/Tasks/Tasks';
import RegisterScreen from '../screens/Register/Register';
import LoginScreen from '../screens/Login/Login';
import PostRegisterScreen from '../screens/PostRegister/PostRegister';

import BackBlack from '../assets/icons/BackArrowBlack.png';

const RootStack = createStackNavigator();

export default RootNavigator = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator
                initialRouteName="Login"
                screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
            >
                <RootStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <RootStack.Screen name="PostRegister" component={PostRegisterScreen} options={{ headerShown: false }} />
                <RootStack.Screen name="Home" component={HomeScreen} />
                <RootStack.Screen name="Tasks" component={TasksScreen} options={({ route, navigation }) => {
                    return {
                        headerBackImage: () => <Image source={BackBlack} style={{ width: 10, height: 15 }} resizeMode="contain" />,
                    }
                }} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}