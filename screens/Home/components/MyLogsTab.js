import React, { useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    Animated,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native'

import Plus from '../../../assets/icons/Plus.png';
import DATA from '../../../assets/data/logs';

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');

const MyLogsTab = ({ openModel }) => {
    const y = useRef(new Animated.Value(0)).current;
    const AddButton = Animated.createAnimatedComponent(TouchableOpacity);
    const animateButton = (to) => Animated.timing(y, {
        toValue: to,
        useNativeDriver: false,
        duration: 60
    });


    return (
        <View style={{ flex: 1, backgroundColor: 'transparent' }} >
            <FlatList
                data={DATA}
                overScrollMode="never"
                contentContainerStyle={{
                    paddingBottom: 24
                }}
                onScroll={(e) => {
                    if (e.nativeEvent.velocity.y > 0) {
                        animateButton(-100).start();
                    } else {
                        animateButton(30).start();
                    }
                }}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ height: 1, width: WIDTH, backgroundColor: '#E5E5E5' }}></View>
                    );
                }}
                renderItem={({ item }) => (
                    <View style={styles.log}>
                        <Text style={{
                            fontFamily: 'Lato-Bold',
                            fontSize: 16,
                            color: '#222222',
                            marginBottom: 5
                        }}>
                            {item.name}
                        </Text>
                        <Text style={{
                            fontFamily: 'Lato-Bold',
                            fontSize: 14,
                            color: '#0073CF',
                            marginBottom: 12
                        }}>
                            {item.tasks.length} Tasks
                            </Text>
                        <Text style={{
                            fontFamily: 'Lato-Regular',
                            fontSize: 13,
                            color: '#828282',
                            marginBottom: 16,
                            lineHeight: 17
                        }}>
                            {item.description}
                        </Text>
                        <Text style={{
                            fontFamily: 'Lato-Bold',
                            fontSize: 12,
                            color: '#555',
                            textAlign: 'right',
                            marginBottom: 6
                        }}>34%</Text>
                        <View style={styles.progress_bar}>
                            <View style={styles.progress}></View>
                        </View>
                    </View>
                )}
            />
            <AddButton style={{ ...styles.add_log_button, bottom: y }} onPress={openModel}>
                <Image source={Plus} style={{ width: 20, height: 20 }} resizeMode="contain" />
            </AddButton>
        </View>
    )
};

const styles = StyleSheet.create({
    log: {
        paddingHorizontal: 12,
        paddingVertical: 18
    },
    progress_bar: {
        height: 4,
        width: '100%',
        backgroundColor: '#E5E5E5',
        borderRadius: 10,
        overflow: 'hidden'
    },
    progress: {
        height: 4,
        width: '40%',
        backgroundColor: '#89CBFF',
        borderRadius: 10,
    },
    add_log_button: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#0073CF',
        width: 60,
        height: 60,
        borderRadius: 30,
        elevation: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default MyLogsTab;