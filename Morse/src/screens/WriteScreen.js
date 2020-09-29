import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Input, Button } from 'react-native-elements';

function Write() {
    return (
        <View style={styles.container}>
            <Input style={styles.textArea}/>
            <Button title="Translate"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
    },
    textArea: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
    },
    button: {
        alignSelf: 'flex-end',
    }
});

export default Write;