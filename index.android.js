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
const ExpenseList = require('./app/expense-list/expense-list').default;
const ExpenseView = require('./app/expense-view/expense-view').default;
const ExpenseAdd = require('./app/expense-add/expense-add').default;

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
            case 'ExpenseList':
                return (<ExpenseList navigator={navigator} title="Expense List" />);
            case 'ExpenseView':
                return (<ExpenseView navigator={navigator} title="Expense View" date={route.date} />);
            case 'ExpenseAdd':
                return (<ExpenseAdd navigator={navigator} title="Expense AddExpenseAdd" />);
        }
    }
}

AppRegistry.registerComponent('billfold', () => billfold);
