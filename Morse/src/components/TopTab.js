import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const TopTab = () => {
    return (
        <Header
            leftComponent={<Icon name="menu" color="white" size={35}/>}
            centerComponent={{text: 'Morse', style: topTabStyles.title }}
            rightComponent={<Icon name="settings" color="white" size={35}/>}/>
    );
};

const topTabStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#03befc',
        height: 60,
    },
    menu: {

    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    settings: {

    },
});

export default TopTab;