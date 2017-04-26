import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import Button from 'react-native-button';

export default class Expense extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <View style={styles.expense}>
                <Text style={styles.expense__purpose}>{this.props.purpose}</Text>
                <Text>{this.props.category}</Text>
                <Text>{this.props.amount}</Text>
                <Text>{(new Date(this.props.date)).toString()}</Text>
                <Button
                    style={styles.button}
                    disabled={!this.props.removable}
                    styleDisabled={styles.buttonDisabled}
                    onPress={() => this.props.onRemove()}>
                    x
                </Button>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    expense: {
        backgroundColor: '#FFFFFF',
        borderColor: '#cccccc',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    button: {
        borderColor: 'red',
        color: 'red',
        borderWidth: 1,
        borderStyle: 'solid',
        width: 28,
        height: 28,
        borderRadius: 20,
        opacity: 0.3,
    },
    expense__purpose: {
        fontSize: 16
    }
});
