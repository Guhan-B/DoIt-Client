import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/Home/Home';
import TasksScreen from '../screens/Tasks/Tasks';

import ThreeDotsWhite from '../assets/icons/ThreeDots.png';
import ThreeDotsBlack from '../assets/icons/ThreeDotsBlack.png';

const Stack = createStackNavigator();

export default AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Tasks">
                <Stack.Screen name="Home" component={HomeScreen} options={({ route }) => {
                    return {
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
                                <TouchableOpacity style={{ marginRight: 22 }} onPress={() => { }}>
                                    <Image source={ThreeDotsWhite} style={{ width: 5, height: 18 }} resizeMode="contain" />
                                </TouchableOpacity>
                            );
                        }
                    }
                }} />
                <Stack.Screen name="Tasks" component={TasksScreen} options={({ route }) => {
                    return {
                        headerStyle: {
                            backgroundColor: '#f4f4f4',
                            elevation: 5,
                        },
                        headerTitleStyle: {
                            fontFamily: 'Lato-Bold',
                            color: '#2d3436'
                        },
                        headerRight: () => {
                            return (
                                <TouchableOpacity style={{ marginRight: 22 }} onPress={() => { }}>
                                    <Image source={ThreeDotsBlack} style={{ width: 5, height: 18 }} resizeMode="contain" />
                                </TouchableOpacity>
                            );
                        }
                    }
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}