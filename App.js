import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';


export default class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             var initialPosition = JSON.stringify(position);
    //             this.setState({position});
    //             console.log(initialPosition);
    //         },
    //         (error) => {
    //             alert(JSON.stringify(error));
    //             console.log(error);
    //         }
    //     );
    // }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    },
                    isLoading: false
                });

            }
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>);
        } else {
            return (
                <MapView style={styles.container}
                         region={this.state.region}
                         onRegionChange={this.onRegionChange}
                />
            );
        }
    }
}

const styles = StyleSheet.create({
  mapContainer: {
      flex: 1,
      position: 'absolute',
      left:0,
      right: 0,
      top:0,
      bottom: 0
  },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
