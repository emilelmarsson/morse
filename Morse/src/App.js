import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import TopTab from "./components/TopTab.js";
import BottomTab from "./components/BottomTab.js";

const Drawer = createDrawerNavigator();

function App() {
    return (
        <NavigationContainer>
            <TopTab/>
            <BottomTab/>
        </NavigationContainer>
    );
}

export default App;