import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import EventDescription from './EventDescription';
import Styles from './Styles';
import { StackNavigator } from 'react-navigation';
import createFragment from 'react-addons-create-fragment'; // ES6


export default class Map extends React.Component {
    static navigationOptions = {
        header: () => createFragment({
            visible: false,
        })
    };

    constructor(props) {
        console.log('fired constructor');
        super(props);
        this.state = {
            isLoading: true,
            events: []
        }
        this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
        console.log('fired constructor success');
    }

    componentWillMount() {
        console.log('fired component mount');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    },
                    isLoading: false,
                });
                //get access code
                fetch('https://fruitloops.herokuapp.com/get/accessCode')
                    .then((response) => console.log(response))
                    .catch((error) => {
                        console.error(error);
                    });
                //set location
                fetch('https://fruitloops.herokuapp.com/set/location?lat=' + position.coords.latitude + '&lng=' + position.coords.longitude)
                    .then((response) => console.log(response))
                    .catch((error) => {
                        console.error(error);
                    });
            }
        );
        console.log('fired component mount success');

    }

    onRegionChangeComplete(region){
        //get events
        console.log(region);
        fetch('https://fruitloops.herokuapp.com/get/events?lat=' + region.latitude + '&lng=' + region.longitude)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.events);
                this.setState({
                    events: responseJson.events,
                    region: region,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        var events = this.state.events;
        var colors = {};
        for (var idx in events) {
            var eventId = events[idx].id;
            if (eventId == this.state.selectedEventID) {
                colors[eventId] = "blue";
            } else {
                colors[eventId] = "red";
            }
        }

        if (this.state.isLoading) {
            return (
                <View style={Styles.container}>
                    <Text>Loading...</Text>
                </View>);
        } else {
            return (
                <View style={Styles.container}>
                    <MapView style={Styles.map}
                             region={this.state.region}
                             onRegionChangeComplete={this.onRegionChangeComplete}
                             showsUserLocation={true}
                    >
                        {this.state.events.map(event => (
                            <MapView.Marker
                                key={event.id}
                                onSelect={() => {console.log(JSON.stringify(event));
                                                this.setState({selectedEventID: event.id,
                                                                selectedEvent: event
                                                })
                                }}
                                pinColor={colors[event.id]}
                                coordinate={{latitude: event.venue.location.latitude, longitude: event.venue.location.longitude}}
                            />
                        ))}
                    </MapView>
                    <EventDescription navigation={this.props.navigation} event={this.state.selectedEvent} />
                </View>
            );
        }
    }
}


