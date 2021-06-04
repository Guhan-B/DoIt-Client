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
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import Plus from '../../../assets/icons/Plus.png';

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');

const MyLogsTab = ({ openModel }) => {
    const y = useRef(new Animated.Value(90)).current;
    const AddButton = Animated.createAnimatedComponent(TouchableOpacity);
    const animateButton = (to) => Animated.timing(y, {
        toValue: to,
        useNativeDriver: false,
        duration: 60
    });

    const navigation = useNavigation();

    const logs = useSelector(state => state.log.logs);

    return (
        <View style={{ flex: 1, backgroundColor: 'transparent' }} >
            <FlatList
                data={logs}
                overScrollMode="never"
                contentContainerStyle={{
                    paddingBottom: 74
                }}
                onScroll={(e) => {
                    if (e.nativeEvent.velocity.y > 0) {
                        animateButton(-100).start();
                    } else {
                        animateButton(90).start();
                    }
                }}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ height: 1, width: WIDTH, backgroundColor: '#E5E5E5' }}></View>
                    );
                }}
                renderItem={({ item, index }) => <LogItem
                    id={item.id}
                    index={index}
                    title={item.title}
                    note={item.note}
                    navigation={navigation}
                    tasks={item.tasks}
                />}
            />
            <AddButton activeOpacity={0.8} style={{ ...styles.add_log_button, bottom: y }} onPress={openModel}>
                <Image source={Plus} style={{ width: 20, height: 20 }} resizeMode="contain" />
            </AddButton>
        </View>
    )
};

const LogItem = ({ id, index, title, note, navigation, tasks }) => {

    const value = useRef(new Animated.Value(0)).current;

    const onLogPress = () => {
        navigation.navigate("Tasks", {
            id,
            index,
            title,
        });
    }

    let progress;
    const completedCount = tasks.filter(task => task.completed).length;
    const pendingCount = tasks.filter(task => !task.completed).length;
    const total = tasks.length;

    if (total === 0) {
        progress = 0;
    } else if (completedCount === 0) {
        progress = 0;
    } else if (pendingCount === 0) {
        progress = 100;
    } else {
        progress = completedCount / total * 100;
    }

    value.setValue(progress);

    const width = value.interpolate({
        inputRange: [0, 100],
        outputRange: [0, WIDTH - 24]
    });

    return (
        <TouchableOpacity onPress={onLogPress} activeOpacity={1} style={styles.log}>
            <Text style={{
                fontFamily: 'Lato-Bold',
                fontSize: 16,
                color: '#2d3436',
                marginBottom: 5
            }}>
                {title}
            </Text>
            <Text style={{
                fontFamily: 'Lato-Bold',
                fontSize: 14,
                color: '#6c5ce7',
                marginBottom: 12
            }}>
                {tasks.length} Tasks
            </Text>
            <Text style={{
                fontFamily: 'Lato-Regular',
                fontSize: 13,
                color: '#636e72',
                marginBottom: 16,
                lineHeight: 17
            }}>
                {note}
            </Text>
            <Text style={{
                fontFamily: 'Lato-Bold',
                fontSize: 12,
                color: '#636e72',
                textAlign: 'right',
                marginBottom: 6
            }}>{Math.floor(progress)}%</Text>
            <View style={styles.progress_bar}>
                <Animated.View style={{ ...styles.progress, width }}></Animated.View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    log: {
        paddingHorizontal: 12,
        paddingVertical: 18
    },
    progress_bar: {
        height: 4,
        width: '100%',
        backgroundColor: '#dfe6e9',
        borderRadius: 10,
        overflow: 'hidden',
    },
    progress: {
        height: 4,
        backgroundColor: '#a29bfe',
        borderRadius: 10,
    },
    add_log_button: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#6c5ce7',
        width: 60,
        height: 60,
        borderRadius: 30,
        elevation: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default MyLogsTab;