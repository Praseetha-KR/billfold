import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';

export default class Expense extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <View>
                <Text>{this.props.purpose}</Text>
                <Text>{this.props.category}</Text>
                <Text>{this.props.amount}</Text>
                <Text>{this.props.date}</Text>
            </View>
        )
    }
}
