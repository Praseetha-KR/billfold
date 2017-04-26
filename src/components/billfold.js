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
            this.state.readonlyMessage = <Text>Online</Text>;
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
            case 'ListDaily':
                return (<Text>list daily</Text>);
            case 'ListMonthly':
                return (<Text>list monthly</Text>);
            default:
                return (<Text>Billfold</Text>);
        }
    }
}
