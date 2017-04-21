import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import EventDescription from './src/components/EventDescription';
import Styles from './src/components/Styles';
import Map from './src/components/Map';
import Event from './src/components/Event';
import { StackNavigator } from 'react-navigation';

const MainScreenNavigator = StackNavigator(
    {
        Home: { screen: Map },
        Event: { screen: Event }
    },
    { headerMode: 'screen' }
);

export default class App extends React.Component {
    render() {
        return (
            <MainScreenNavigator />
        )
    }

}


