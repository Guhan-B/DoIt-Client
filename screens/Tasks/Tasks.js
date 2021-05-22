import React, { useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    SectionList,
    Animated
} from 'react-native';

import AddTaskModal from './components/AddTaskModal';
import TaskListItem from './components/TaskListItem';

import ThreeDots from '../../assets/icons/ThreeDotsBlack.png';
import Plus from '../../assets/icons/Plus.png';


const AddButton = Animated.createAnimatedComponent(TouchableOpacity);
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
    const y = useRef(new Animated.Value(0)).current;
    const animateButton = (to) => Animated.timing(y, {
        toValue: to,
        useNativeDriver: false,
        duration: 60
    });

    let modelRef = useRef(null);
    const setModelRef = (ref) => modelRef = ref;

    const openAddTaskModel = () => {
        modelRef.open();
    }

    const closeAddTaskModel = () => {
        modelRef.close();
    }

    return (
        <>
            {/* <View style={styles.navbar}>
                <Text style={styles.screen_name}>Assignments</Text>
                <TouchableOpacity style={styles.more_button} onPress={() => modelRef.open()}>
                    <Image source={ThreeDots} style={{ width: 5, height: 18 }} resizeMode="contain" />
                </TouchableOpacity>
            </View> */}
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
                        return <TaskListItem name={item.title} priority={item.priority}/>
                    }}
                />
            </View>
            <AddButton style={{ ...styles.add_log_button, bottom: y }} onPress={openAddTaskModel}>
                <Image source={Plus} style={{ width: 20, height: 20 }} resizeMode="contain" />
            </AddButton>
            <AddTaskModal setRef={setModelRef} close={closeAddTaskModel}/>
        </>
    );
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    screen_name: {
        color: '#222222',
        fontFamily: 'Lato-Bold',
        fontSize: 17
    },
    navbar: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f4f4f4',
        // elevation: 3
    },
    more_button: {
        width: 15,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
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