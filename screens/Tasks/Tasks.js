import React, { useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    SectionList,
    Animated,
    LogBox
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AddTaskModal from './components/AddTaskModal';
import MoreModal from './components/MoreModal';
import TaskListItem from './components/TaskListItem';
import Plus from '../../assets/icons/Plus.png';
import ThreeDotsBlack from '../../assets/icons/ThreeDotsBlack.png';
import BackBlack from '../../assets/icons/BackArrowBlack.png';


const DATA = [
    {
        title: "Pending",
        data: [
            {
                id: '1',
                title: 'Task Name 1',
                priority: 2
            },
            {
                id: '2',
                title: 'Task Name 2',
                priority: 2
            },
            {
                id: '3',
                title: 'Task Name 3',
                priority: 1
            },
            {
                id: '4',
                title: 'Task Name 4',
                priority: 0
            },
            {
                id: '5',
                title: 'Task Name 5',
                priority: 2
            },
        ]
    },
    {
        title: "Completed",
        data: [
            {
                id: '6',
                title: 'Task Name 1',
                priority: 2
            },
            {
                id: '7',
                title: 'Task Name 2',
                priority: 2
            },
            {
                id: '8',
                title: 'Task Name 3',
                priority: 1
            },
            {
                id: '9',
                title: 'Task Name 4',
                priority: 0
            },
            {
                id: '10',
                title: 'Task Name 5',
                priority: 2
            },
        ]
    }
];

const Tasks = () => {
    const AddButton = Animated.createAnimatedComponent(TouchableOpacity);
    const y = useRef(new Animated.Value(30)).current;
    const navigation = useNavigation();
    const animateButton = (to) => Animated.timing(y, {
        toValue: to,
        useNativeDriver: false,
        duration: 60
    });
    let addModalRef = useRef(null);
    let moreModalRef = useRef(null);

    useEffect(() => {
        navigation.setOptions({
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
            headerRight: () => {
                return (
                    <TouchableOpacity activeOpacity={0.8} style={styles.more_button} onPress={openMoreModal}>
                        <Image source={ThreeDotsBlack} style={{ width: 5, height: 17 }} resizeMode="contain" />
                    </TouchableOpacity>
                );
            }
        });
    }, []);

    const setTaskModalRef = (ref) => addModalRef = ref;
    const setMoreModalRef = (ref) => moreModalRef = ref;

    const openAddTaskModal = () => {
        addModalRef.open();
    }

    const closeAddTaskModal = () => {
        addModalRef.close();
    }

    const openMoreModal = () => {
        moreModalRef.open();
    }

    const closeMoreModal = () => {
        moreModalRef.close();
    }

    return (
        <>
            <View style={styles.screen}>
                <SectionList
                    sections={DATA}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: 1, width: '100%', backgroundColor: '#dfe6e9' }}></View>
                        );
                    }}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                    onScroll={(e) => {
                        if (e.nativeEvent.velocity.y > 0) {
                            animateButton(-100).start();
                        } else {
                            animateButton(30).start();
                        }
                    }}
                    renderItem={({ item, index }) => {
                        return <TaskListItem name={item.title} priority={item.priority} />
                    }}
                />
            </View>
            <AddButton activeOpacity={0.8} style={{ ...styles.add_log_button, bottom: y }} onPress={openAddTaskModal}>
                <Image source={Plus} style={{ width: 20, height: 20 }} resizeMode="contain" />
            </AddButton>
            <AddTaskModal setRef={setTaskModalRef} close={closeAddTaskModal} />
            <MoreModal setRef={setMoreModalRef} close={closeMoreModal} />
        </>
    );
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    more_button: {
        marginRight: 22,
        height: '70%',
        width: 30,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    task: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 0,
        borderLeftWidth: 6,
        height: 70,
        justifyContent: 'space-between',
        paddingRight: 18,
    },
    header: {
        paddingHorizontal: 6,
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: '#b2bec3',
        paddingBottom: 10,
        paddingTop: 14
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
    },
    rightActionWrapper: {
        flex: 1,
        backgroundColor: '#d63031',
        alignItems: 'flex-start'
    },
    rightAction: {
        width: 75,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftActionWrapper: {
        flex: 1,
        backgroundColor: '#00b894',
        alignItems: 'flex-end'
    },
    leftAction: {
        width: 75,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Tasks;