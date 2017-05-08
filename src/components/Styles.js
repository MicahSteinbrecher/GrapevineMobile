import {
    StyleSheet, Dimensions
} from 'react-native';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height/7;



var Styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
        fontSize: 16,
        paddingLeft: 10,
        paddingTop: 10,
    },
    time: {
        fontSize: 10,
        paddingLeft: 10,
        paddingTop: 10,
    }
});

export default Styles