import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,  ScrollView, Image } from 'react-native';
import Styles from './Styles';

export default class Event extends React.Component {
    render() {
        return (

            <ScrollView>
                <View style={Styles.firstListItem}>
                    <Image source={{uri: this.props.navigation.state.params.event.coverPicture}}
                           style={{width: 400, height: 400}}/>
                </View>
                <View style={Styles.listItem} >
                    <Text> {this.props.navigation.state.params.event.name} </Text>
                </View>
                <View style={Styles.listItem} >
                    <Text> {this.props.navigation.state.params.event.description} </Text>
                </View>
                <View style={Styles.listItem} >
                    <Text> {this.props.navigation.state.params.event.street},  {this.props.navigation.state.params.event.city}, {this.props.navigation.state.params.event.state}</Text>
                </View>
                <View style={Styles.listItem} >
                    <Text> {this.props.navigation.state.params.event.time} </Text>
                </View>
                <View style={Styles.listItem} >
                    <Text> Attending: {this.props.navigation.state.params.event.stats.attending},
                            Maybe: {this.props.navigation.state.params.event.stats.maybe}</Text>
                </View>
            </ScrollView>
        )
    }
}