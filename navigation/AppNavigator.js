import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/Home/Home';
import TasksScreen from '../screens/Tasks/Tasks';
import RegisterScreen from '../screens/Register/Register';
import LoginScreen from '../screens/Login/Login';

import BackBlack from '../assets/icons/BackArrowBlack.png';

const Stack = createStackNavigator();

export default AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Tasks" component={TasksScreen} options={({ route, navigation }) => {
                    console.log(route);
                    return {

                        headerBackImage: () => <Image source={BackBlack} style={{ width: 10, height: 15 }} resizeMode="contain" />,

                    }
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}