import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Image
} from 'react-native';
import Modal from 'react-native-raw-bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';


import Calander from '../../../assets/icons/Calendar.png';
import Plus from '../../../assets/icons/PlusBlack.png';
import Minus from '../../../assets/icons/MinusBlack.png';

const AddLogModal = ({ setRef, close }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [priority, setPriority] = useState(0);
    const [name, setName] = useState('');
    const modalStyles = { container: { paddingHorizontal: 12, borderTopLeftRadius: 20, borderTopRightRadius: 20 } };

    const priorityHandler = (num) => {
        if (priority > 0 && num === -1) {
            return setPriority(priority - 1);
        }
        if (priority < 2 && num === 1) {
            return setPriority(priority + 1);
        }
    }

    const getPriority = (val) => {
        if (val === 0)
            return "Low Prority";
        if (val === 1)
            return "Medium Prority";
        if (val === 2)
            return "High Prority";
    }

    const getPriorityColor = (val) => {
        if (val === 0)
            return "#74b9ff";
        if (val === 1)
            return "#ffeaa7";
        if (val === 2)
            return "#ff7675";
    }


    const createHandler = () => {
        console.log(name, priority, date);
        close();
    }

    const discardHandler = () => {
        setName('');
        setPriority(0);
        setDate(new Date());
        close();
    }

    const onCloseHandler = () => {
        setName('');
        setPriority(0);
        setDate(new Date());
    }

    const dateChange = (e) => {
        setShowDatePicker(false);
        if (e.type == "set") {
            setDate(e.nativeEvent.timestamp);
        }
    }

    return (
        <>
            {
                showDatePicker && <DateTimePicker
                    themeVariant="dark"
                    textColor
                    mode="date"
                    value={new Date()}
                    display="default"
                    testID="1"
                    onChange={dateChange}
                />
            }
            <Modal customStyles={modalStyles} closeOnDragDown={true} ref={setRef} height={415} onClose={onCloseHandler}>
                <View style={{ marginBottom: 16, marginTop: 16 }}>
                    <Text style={{ marginBottom: 8, fontFamily: 'Lato-Bold', color: '#555555' }}>Name</Text>
                    <TextInput
                        value={name}
                        style={{
                            borderColor: '#e0e0e0',
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingHorizontal: 12,
                            paddingVertical: 8,
                            fontFamily: 'Lato-Regular',
                            color: '#222',
                        }}
                        onChangeText={(e) => setName(e)}
                    />
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 8, fontFamily: 'Lato-Bold', color: '#555555' }}>Due Date</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            editable={false}
                            style={{
                                borderColor: '#e0e0e0',
                                borderWidth: 1,
                                borderRadius: 8,
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                fontFamily: 'Lato-Regular',
                                color: '#222',
                                flex: 1
                            }}
                            value={date.toDateString()}
                        />
                        <TouchableOpacity style={styles.pick_date_button} onPress={() => setShowDatePicker(true)}>
                            <Image source={Calander} style={{ width: 20, height: 20 }} resizeMode="center" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 8, fontFamily: 'Lato-Bold', color: '#555555' }}>Priority</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.less_button} onPress={() => priorityHandler(-1)}>
                            <Image source={Minus} style={{ width: 15, height: 15 }} resizeMode="center" />
                        </TouchableOpacity>
                        <TextInput
                            editable={false}
                            value={getPriority(priority)}
                            style={{
                                textAlign: 'center',
                                borderColor: '#e0e0e0',
                                borderWidth: 1,
                                borderRadius: 8,
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                fontFamily: 'Lato-Regular',
                                color: getPriorityColor(priority),
                                flex: 1
                            }}
                        />
                        <TouchableOpacity style={styles.more_button} onPress={() => priorityHandler(1)}>
                            <Image source={Plus} style={{ width: 15, height: 15 }} resizeMode="center" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.controls}>
                    <TouchableOpacity style={styles.primary_button} onPress={createHandler}>
                        <Text style={{ fontFamily: 'Lato-Bold', color: '#f4f4f4', fontSize: 14 }}>Create Task</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondary_button} onPress={discardHandler}>
                        <Text style={{ fontFamily: 'Lato-Bold', color: '#555', fontSize: 14 }}>Discard</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    controls: {
        flexDirection: 'row',
        marginTop: 32
    },
    primary_button: {
        backgroundColor: '#6c5ce7',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 45,
        marginRight: 8
    },
    secondary_button: {
        backgroundColor: '#f0f0f0',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 45,
        marginLeft: 8
    },
    pick_date_button: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 16,
        marginLeft: 6,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    less_button: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 16,
        marginRight: 6,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    more_button: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 16,
        marginLeft: 6,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default AddLogModal;