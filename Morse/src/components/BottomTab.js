import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Write from './../screens/WriteScreen'
import Read from './../screens/ReadScreen'

const Tab = createBottomTabNavigator();

const BottomTab = ({navigation}) => {
  return (
    <Tab.Navigator
        initialRouteName="Write"
        tabBarOptions={{
            activeTintColor: '#2089dc',
            labelStyle: {fontSize: 15},
            style: {height: 60}
        }}
    >
        <Tab.Screen
            name="Write"
            component={Write}
            options={{
                tabBarLabel: 'Write',
                tabBarIcon: ({color}) => (
                    <Icon name="pencil" size={35} color={color}/>
                ),
            }}
            style={{
                fontSize: 40,
            }}
        />
        <Tab.Screen
            name="Read"
            component={Read}
            options={{
                tabBarLabel: 'Read',
                tabBarIcon: ({color}) => (
                    <Icon name="book" size={35} color={color}/>
                ),
            }}
        />
    </Tab.Navigator>
  );
}

export default BottomTab;