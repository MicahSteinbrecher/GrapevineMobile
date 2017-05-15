import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, SegmentedControlIOS } from 'react-native';
import MapView from 'react-native-maps';
import EventDescription from './EventDescription';
import Styles from './Styles';
import { StackNavigator } from 'react-navigation';
import createFragment from 'react-addons-create-fragment'; // ES6
import { Container, Header, Item, Input, Icon, Button, Segment, Row } from 'native-base';
import {debounce} from 'throttle-debounce';
import dismissKeyboard from 'react-native-dismiss-keyboard';



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
            events: [],
            search: null,
        }
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

    shouldComponentUpdate(nextProps, nextState){
        if (nextState != this.state) {
            return true;
        }
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextState.events) {
            var events = nextState.events;
            var colors = {};
            for (var idx in events) {
                var eventId = events[idx].id;
                if (eventId == nextState.selectedEventID) {
                    colors[eventId] = "blue";
                } else {
                    colors[eventId] = "red";
                }
            }

            this.markers = null;
            this.markers = nextState.events.map(event => (
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
            ))
        }

    }

    onRegionChangeComplete(region){
        //get events
        if (region) {
            this.setState({region: region, selectedEventID: null, selectedEvent: null});
            this.getEvents(region);
        }
    }

    getEvents(region) {
        fetch('https://fruitloops.herokuapp.com/get/events?lat=' + region.latitude + '&lng=' + region.longitude)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.events);
                this.setState({
                    events: responseJson.events,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleKeyPress(event){
        if (event.nativeEvent.key == 'Enter' || event.nativeEvent.key == 'Return'){
            this.handleSearch();
        }
    }
    /* update region for now*/
    handleSearch(){
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+this.state.search+'&key=AIzaSyDAP8TaK4JPkNgFDVqLLwogC3a8SG3t5r4')
            .then((response) => response.json())
            .then((responseJson) => {
            var location = responseJson.results[0].geometry.location;
            var region =
                {latitude: location.lat,
                longitude: location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421};
                this.setState({region: region, search: null});
                dismissKeyboard();
            })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={Styles.container}>
                    <Text>Loading...</Text>
                </View>);
        } else {
            return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search location" onChangeText={(text)=>this.setState({search: text})} value={this.state.search} onKeyPress={(event) => this.handleKeyPress(event)}/>
                    </Item>
                    <Button transparent onPress={()=> this.handleSearch()}>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <SegmentedControlIOS
                    style={Styles.segment}
                    values={['Today', 'Tomorrow', 'This Week']}
                    onChange={(event) => {
                        this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
                      }}
                />
                <View style={Styles.container}>
                    <MapView style={Styles.map}
                             region={this.state.region}
                             onRegionChangeComplete={(region) => {this.onRegionChangeComplete(region)}}
                             showsUserLocation={true}
                    >
                        {this.markers}
                    </MapView>
                </View>
                <EventDescription navigation={this.props.navigation} event={this.state.selectedEvent} />
            </Container>

            );
        }
    }
}


