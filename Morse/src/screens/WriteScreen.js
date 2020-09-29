import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Button, Icon, CheckBox } from 'react-native-elements';
import Flashlight from 'react-native-torch';
import { Platform } from 'react-native';

const morse = require('morse');

class Write extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            muted: false,
            flash: true,
        };
    }

    mute(){
        this.setState({muted: !this.state.muted});
        console.log(this.state.muted);
    }

    async translate(){
        console.log(morse.encode(this.state.text));

        const cameraAllowed = await Flashlight.requestCameraPermission(
            'Camera Permissions', // dialog title
            'We require camera permissions to use the torch on the back of your phone.' // dialog body
        );

        if (cameraAllowed) {
            Flashlight.switchState(true);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput multiline numberOfLines={4} style={styles.textArea} onChangeText={(text) => this.setState({text})}/>
                <CheckBox Component={TouchableWithoutFeedback}
                          iconType='octicon'
                          checkedIcon='mute'
                          uncheckedIcon='unmute'
                          uncheckedColor='gray'
                          checkedColor='gray'
                          checked={this.state.muted}
                          onPress={() => this.mute()}
                          size={30}
                          style={styles.muteButton}/>
                <Button title="Translate" buttonStyle={styles.translateButton} onPress={() => this.translate()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textArea: {
        backgroundColor: 'white',
        margin: 10,
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
    },
    muteButton: {

    },
    flashlightButton: {

    },
    translateButton: {
        alignSelf: 'flex-end',
    },
});

export default Write;