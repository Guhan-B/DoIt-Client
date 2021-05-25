import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/Home/Home';
import TasksScreen from '../screens/Tasks/Tasks';

import ThreeDotsWhite from '../assets/icons/ThreeDots.png';
import ThreeDotsBlack from '../assets/icons/ThreeDotsBlack.png';
import BackBlack from '../assets/icons/BackArrowBlack.png';

const Stack = createStackNavigator();

export default AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
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