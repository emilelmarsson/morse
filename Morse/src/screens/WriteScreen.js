import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

class Write extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput multiline numberOfLines={4} style={styles.textArea} onChangeText={(text) => this.setState({text})}/>
                <Button title="Translate" buttonStyle={styles.button}/>
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
    button: {
        alignSelf: 'flex-end',
    }
});

export default Write;