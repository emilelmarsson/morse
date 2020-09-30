import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Button, Icon, CheckBox } from 'react-native-elements';
import { Platform, Keyboard } from 'react-native';
import Flashlight from 'react-native-torch';
import {start, stop} from 'react-native-beep-tone';

const morse = require('morse');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class Write extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            muted: false,
            flash: true,
            translating: false,
        };
    }

    mute(){
        this.setState({muted: !this.state.muted});
        console.log(this.state.muted);
    }

    async translate(){
        if(this.state.translating)
            return;
        Keyboard.dismiss();
        this.setState({translating: true});

        // Splitting on spaces into words
        var morseCode = morse.encode(this.state.text).split(' ....... ');
        // Splitting into characters within words
        for(var i=0; i<morseCode.length; i++){
            morseCode[i] = morseCode[i].split(' ');
        }

        // Morse code constants
        const SHORT_SIGNAL = 1,
              LONG_SIGNAL = 3,
              INTRACHARACTER_PAUSE = 1,
              INTRAWORD_PAUSE = 3,
              INTERWORD_PAUSE = 7,
              UNIT = 100;

        console.log(morseCode);

        const cameraAllowed = await Flashlight.requestCameraPermission(
            'Camera Permissions', // dialog title
            'We require camera permissions to use the torch on the back of your phone.' // dialog body
        );

        if (cameraAllowed && (this.state.flash || !this.state.muted)) {
            for(var i=0; i<morseCode.length; i++){

                for(var j=0; j<morseCode[i].length; j++){
                    var length = morseCode[i][j] == '.' ? 1 : 3;

                    for(var k=0; k<morseCode[i][j].length; k++){
                        var length = morseCode[i][j][k] == '.' ? 1 : 3;

                        if(this.state.flash)
                            Flashlight.switchState(true);
                        if(!this.state.muted)
                            start(100);

                        await delay(UNIT * length);

                        if(this.state.flash)
                            Flashlight.switchState(false);
                        if(!this.state.muted)
                            stop();

                        if(k < morseCode[i][j].length - 1)
                            await delay(UNIT);
                    }

                    if(j < morseCode[i].length - 1)
                        await delay(UNIT * 3);
                }

                if(i < morseCode.length - 1)
                    await delay(UNIT * 7);
            }
        }

        Flashlight.switchState(false);
        stop();
        this.setState({translating: false});
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder="Enter text to be translated into morse code..."
                           multiline
                           numberOfLines={9}
                           style={styles.textArea}
                           onChangeText={(text) => this.setState({text})}
                           editable={!this.state.translating}/>
                <View style={styles.togglables}>
                    <View style={styles.controllers}>
                        <CheckBox Component={TouchableWithoutFeedback}
                                  iconType='octicon'
                                  checkedIcon='mute'
                                  uncheckedIcon='unmute'
                                  uncheckedColor='gray'
                                  checkedColor='gray'
                                  checked={this.state.muted}
                                  onPress={() => this.mute()}
                                  disabled={this.state.translating}
                                  size={30}
                                  style={styles.muteButton}/>
                        <CheckBox Component={TouchableWithoutFeedback}
                                  iconType='material-community'
                                  checkedIcon='lightbulb-off-outline'
                                  uncheckedIcon='lightbulb-outline'
                                  uncheckedColor='gray'
                                  checkedColor='gray'
                                  checked={!this.state.flash}
                                  onPress={() => this.setState({flash: !this.state.flash})}
                                  disabled={this.state.translating}
                                  size={30}
                                  style={styles.flashlightButton}/>
                    </View>
                    <Button title="Translate"
                            buttonStyle={styles.translateButton}
                            onPress={() => this.translate()}
                            disabled={this.state.translating}
                            loading={this.state.translating}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 2,
        top: '3%',
        alignItems: 'center',
    },
    title: {
        color: 'gray',
    },
    textArea: {
        backgroundColor: 'white',
        margin: 10,
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        textAlignVertical: 'top'
    },
    togglables: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    controllers: {
        flexDirection: 'row',
    },
    muteButton: {

    },
    flashlightButton: {

    },
    translateButton: {
        alignSelf: 'flex-end',
        width: 100,
    },
});

export default Write;