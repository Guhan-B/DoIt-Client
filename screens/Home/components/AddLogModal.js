import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet
} from 'react-native';
import Modal from 'react-native-raw-bottom-sheet';

const AddLogModal = ({ setRef,close }) => {


    const callClose = () => {
        close();
    }

    return (
        <Modal customStyles={{
            container: { paddingHorizontal: 12, borderTopLeftRadius: 20, borderTopRightRadius: 20 }
        }}
            closeOnDragDown={true}
            ref={setRef}
            height={400}
        >
            <View style={{ marginBottom: 16, marginTop: 16 }}>
                <Text style={{ marginBottom: 8, fontFamily: 'Lato-Bold', color: '#555555' }}>Title</Text>
                <TextInput
                    selectionColor="#a29bfe"
                    style={{
                        borderColor: '#e0e0e0',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        fontFamily: 'Lato-Regular',
                        color: '#222',
                    }}
                />
            </View>
            <View>
                <Text style={{ marginBottom: 8, fontFamily: 'Lato-Bold', color: '#555555' }}>Note</Text>
                <TextInput
                    selectionColor="#a29bfe"
                    autoCompleteType="off"
                    underlineColorAndroid="transparent"
                    spellCheck={false}
                    multiline={true}
                    maxLength={120}
                    numberOfLines={5}
                    style={{
                        borderColor: '#e0e0e0',
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                        fontFamily: 'Lato-Regular',
                        color: '#222',
                        textAlignVertical: 'top'
                    }}
                    keyboardType="ascii-capable"
                />
                <Text style={{ fontFamily: 'Lato-Regular', fontSize: 11, textAlign: 'right', marginTop: 5, color: '#555' }}>
                    20/120
                </Text>
                <View style={styles.controls}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.primary_button}>
                        <Text style={{ fontFamily: 'Lato-Bold', color: '#f4f4f4', fontSize: 14 }}>Create Log</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.secondary_button} onPress={callClose}>
                        <Text style={{ fontFamily: 'Lato-Bold', color: '#555', fontSize: 14 }}>Discard</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
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
    }
});

export default AddLogModal;