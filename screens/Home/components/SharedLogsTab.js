import React from 'react';
import {
    View,
    Text
} from 'react-native';
import LottieView from 'lottie-react-native';
import gearAnimation from '../../../assets/lottie/gears.json';


const SharedLogsTab = () => {
    console.log(gearAnimation);
    return (
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 100 }}>
            <View style={{ width: 60, height: 120 }}>
                <LottieView resizeMode="cover" autoSize={false} source={gearAnimation} autoPlay loop />
            </View>
            <Text style={{fontFamily: 'Lato-Regular', color:"#636e72"}}>Coming Soon</Text>
        </View>
    )
};

export default SharedLogsTab;