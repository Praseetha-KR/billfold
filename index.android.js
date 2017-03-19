import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import { Provider } from 'react-redux';
import App from './src/containers/app';
import configureStore from './src/store/configure_store';

const store = configureStore();

export default class Billfold extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

AppRegistry.registerComponent('billfold', () => Billfold);
