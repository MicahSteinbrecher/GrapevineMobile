import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Styles from './Styles';

export default class EventDescription extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        if (this.props.event) {
            return (
                <TouchableOpacity style={Styles.eventDescription}
                                  onPress={ () => navigate('Event', { event: this.props.event }) }
                >
                    <Text style={Styles.title}> {this.props.event.name} </Text>
                    <Text style={Styles.time}> {this.props.event.time} </Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <Text>
                </Text>
            )
        }
    }
}