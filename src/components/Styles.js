import {
    StyleSheet, Dimensions
} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height/7;



var Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        marginTop: 1.5,
        ...StyleSheet.absoluteFillObject,
    },
    eventDescription: {
        backgroundColor: 'white',
        height: height,
        width: width,
        borderTopWidth: 1,
        borderColor: 'gray',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    listItem: {
        minHeight:40,
        borderColor: 'gray',
        borderBottomWidth: 1
    },
    firstListItem: {
        borderColor: 'gray',
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    coverPhoto: {
        width: width,
        height: 500,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 10,
        paddingTop: 10,
    },
    time: {
        fontSize: 14,
        paddingLeft: 10,
        paddingTop: 10,
    }
});

export default Styles