import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

export default class First extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.largeText}>Frst View</Text>
                <TouchableHighlight>
                    <Text>Testing</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dddfd4'
    },
    largeText: {
        flex: 1,
        fontSize: 20
    }
});

