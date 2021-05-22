import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import Swipeable from 'react-native-swipeable';

import Delete from '../../../assets/icons/DeleteWhite.png';
import Done from '../../../assets/icons/Done.png';

const TaskListItem = ({ name, date, id, priority }) => {
    let color;

    if (priority === 0) {
        color = '#74b9ff';
    }
    else if (priority === 1) {
        color = '#ffeaa7';
    }
    else {
        color = '#ff7675';
    }

    const rightContent =
        <View style={styles.rightActionWrapper}>
            <View style={styles.rightAction}>
                <Image source={Delete} style={{ height: 20, width: 20 }} />
                <Text style={{ fontFamily: 'Lato-Bold', fontSize: 11, color: '#f4f4f4', marginTop: 6 }}>DELETE</Text>
            </View>
        </View>
        ;

    const leftContent =
        <View style={styles.leftActionWrapper}>
            <View style={styles.leftAction}>
                <Image source={Done} style={{ height: 20, width: 20 }} resizeMode="center" />
                <Text style={{ fontFamily: 'Lato-Bold', fontSize: 11, color: '#f4f4f4', marginTop: 6 }}>DONE</Text>
            </View>
        </View>
        ;

    const onLeftActionRelease = () => {
        console.log("left done");
    }

    const onRightActionRelease = () => {
        console.log("right done");
    }

    return (
        <Swipeable {...{ leftContent, rightContent, onLeftActionRelease, onRightActionRelease }} >
            <View style={{ ...styles.task, borderLeftColor: color}}>
                <Text style={{ fontFamily: 'Lato-Bold', fontSize: 15, color: '#2d3436' }}>{name}</Text>
                <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, textAlign: 'right', color: '#636e72' }}>
                    24th Dec 2020
                </Text>
            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    task: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 0,
        borderLeftWidth: 6,
        height: 70,
        justifyContent: 'space-between',
        paddingRight: 18,
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

export default TaskListItem;