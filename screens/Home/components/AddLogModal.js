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
    const [titleInputColor, setTitleInputColor] = useState('#e0e0e0');
    const [titleLabelColor, setTitleLabelColor] = useState('#666666');
    const [descInputColor, setDescInputColor] = useState('#e0e0e0');
    const [descLabelColor, setDescLabelColor] = useState('#666666');

    const callClose = () => {
        setDescInputColor('#e0e0e0'); 
        setDescLabelColor('#555555');
        setTitleInputColor('#e0e0e0'); 
        setTitleLabelColor('#555555');
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
                <Text style={{ marginBottom: 6, fontFamily: 'Lato-Bold', color: titleLabelColor }}>Title</Text>
                <TextInput
                    style={{
                        borderColor: titleInputColor,
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        fontFamily: 'Lato-Regular',
                        color: '#222',
                    }}
                    onFocus={() => { setTitleInputColor('#89CBFF'); setTitleLabelColor('#89CBFF'); }}
                    onBlur={() => { setTitleInputColor('#e0e0e0'); setTitleLabelColor('#555555'); }}
                />
            </View>
            <View>
                <Text style={{ marginBottom: 6, fontFamily: 'Lato-Bold', color: descLabelColor }}>Description</Text>
                <TextInput
                    selectionColor="#89CBFF"
                    autoCompleteType="off"
                    underlineColorAndroid="transparent"
                    spellCheck={false}
                    multiline={true}
                    maxLength={120}
                    numberOfLines={5}
                    style={{
                        borderColor: descInputColor,
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                        fontFamily: 'Lato-Regular',
                        color: '#222',
                        textAlignVertical: 'top'
                    }}
                    onFocus={() => { setDescInputColor('#89CBFF'); setDescLabelColor('#89CBFF'); }}
                    onBlur={() => { setDescInputColor('#e0e0e0'); setDescLabelColor('#555555'); }}
                    keyboardType="ascii-capable"
                />
                <Text style={{ fontFamily: 'Lato-Regular', fontSize: 11, textAlign: 'right', marginTop: 5, color: '#555' }}>
                    20/120
                </Text>
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.primary_button}>
                        <Text style={{ fontFamily: 'Lato-Bold', color: '#f4f4f4', fontSize: 14 }}>Create Log</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondary_button} onPress={callClose}>
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
        backgroundColor: '#0073CF',
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