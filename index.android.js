/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

var First = require('./app/first').default;

export default class billfold extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{id: 'First'}}
                renderScene={this.navigatorRenderScene}
            />
        );
    }
    navigatorRenderScene(route, navigator) {
        switch(route.id) {
            case 'First':
                return (<First navigator={navigator} title="first" />);
        }
    }
}

AppRegistry.registerComponent('billfold', () => billfold);
