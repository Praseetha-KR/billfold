import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

var ToolbarAndroid = require('ToolbarAndroid');
var TouchableHighlight = require('TouchableHighlight');

export default class ExpenseList extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            actionText: 'Expense List',
        }
    }

    render() {
        return (
            <View title="<ToolbarAndroid>">
                <ToolbarAndroid
                    actions={toolbarActions}
                    logo={require('../img/logo.png')}
                    onActionSelected={(e) => this._onActionSelected(e)}
                    onIconClicked={() => this.setState({actionText: 'Icon clicked'})}
                    style={styles.toolbar}
                    subtitle={this.state.actionText}
                    title="Billfold" />
                <Text>{this.state.actionText}</Text>
                <TouchableHighlight onPress={()=>this._selectLink('First')}>
                    <Text>First</Text>
                </TouchableHighlight>
            </View>
        );
    }

    _onActionSelected(position) {
        this.setState({
            actionText: toolbarActions[position].title,
        });
    }

    _selectLink(nav) {
        this.props.navigator.push({
            id: nav,
            title: nav
        });
    }
}

var toolbarActions = [
    {title: 'Create', icon: require('../img/logo.png'), show: 'always'},
    {title: 'Filter 1'},
    {title: 'Filter 2'},
    {title: 'Filter 3'},
    {title: 'Filter 4'},
    {title: 'Filter 5'},
    {title: 'Settings', icon: {uri: 'http://redux.js.org/gitbook/images/apple-touch-icon-precomposed-152.png'}, show: 'always'},
];

var styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#ff6600',
        height: 56,
    },
});
