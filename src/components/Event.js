import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,  ScrollView, Image } from 'react-native';
import Styles from './Styles';
import FitImage from 'react-native-fit-image';


export default class Event extends React.Component {
    render() {
        return (

            <ScrollView>
                <View style={Styles.firstListItem}>
                    <FitImage source={{uri: this.props.navigation.state.params.event.coverPicture}}/>
                </View>
                <View style={Styles.listItem}>
                    <Text style={{fontWeight:'bold',fontSize:20}}> {this.props.navigation.state.params.event.name} </Text>
                </View>
                <View style={Styles.listItem}>
                    <Text style={{fontSize:20}}> {this.props.navigation.state.params.event.description} </Text>
                </View>
                <View style={Styles.listItem}>
                    <Text style={{fontSize:20}}> {this.props.navigation.state.params.event.venue.location.street},  {this.props.navigation.state.params.event.venue.location.city}, {this.props.navigation.state.params.event.venue.location.state}</Text>
                </View>
                <View style={Styles.listItem}>
                    <Text style={{fontSize:20}}> {this.props.navigation.state.params.event.time} </Text>
                </View>
                <View style={Styles.listItem}>
                    <Text style={{fontSize:20}}> Attending: {this.props.navigation.state.params.event.stats.attending},
                            Maybe: {this.props.navigation.state.params.event.stats.maybe}</Text>
                </View>
            </ScrollView>
        )
    }
}