import React, { Component } from 'react';
import {
    NetInfo,
    Text,
    ListView,
    View,
    TextInput,
    Button,
    Navigator
} from 'react-native';
import Expense from './expense';
import Timeline from './timeline';
import AddExpense from './add_expense';
import ViewExpense from './view_expense';

export default class Billfold extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expenses: [],
            readonlyMessage: ''
        };
    }

    componentWillMount() {
        this.props.loadOfflineExpenses();

        if (NetInfo) {
            NetInfo.isConnected.fetch().done(isConnected => {
                if (isConnected) {
                    this.props.checkConnection();
                } else {
                    this.props.goOffline();
                }
            });
        } else {
            this.props.checkConnection();
        }
    }

    render() {
        if (this.props.connected) {
            this.state.expenses = this.props.onlineExpenses;
            this.state.readonlyMessage = <Text></Text>;
        } else if (this.props.connectionChecked) {
            this.state.expenses = this.props.offlineExpenses,
            this.state.readonlyMessage = <Text>Offline</Text>;
        } else {
            this.state.expenses = [],
            this.state.readonlyMessage = <Text>Loading...</Text>;
        }

        return (
            <Navigator
                initialRoute={{id: 'Timeline'}}
                renderScene={this.navigatorRenderScene.bind(this)}
            />
        );
    }
    navigatorRenderScene(route, navigator) {
        switch(route.id) {
            case 'Timeline':
                return (
                    <Timeline
                        connected={this.props.connected}
                        removeExpenseFn={this.props.removeExpense}
                        expenses={this.state.expenses}
                        readonlyMessage={this.state.readonlyMessage}
                        navigator={navigator}
                        title="Timeline"
                    />
                );
            case 'AddExpense':
                return (
                    <AddExpense
                        addExpenseFn={this.props.addExpense}
                        connected={this.props.connected}
                        navigator={navigator}
                        title="Add Expense"
                    />
                );
            case 'ViewExpense':
                return (
                    <ViewExpense
                        navigator={navigator}
                        title="View Expense"
                        date={route.date}
                    />
                );
            default:
                return (<Text>Billfold</Text>);
        }
    }
}
