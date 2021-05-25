import React from 'react';
import {
    View
} from 'react-native';
import LottieView from 'lottie-react-native';
import gearAnimation from '../../../assets/lottie/gears.json';


const SharedLogsTab = () => {
    console.log(gearAnimation);
    return (
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <LottieView source={gearAnimation} autoPlay loop />
        </View>
    )
};

export default SharedLogsTab;