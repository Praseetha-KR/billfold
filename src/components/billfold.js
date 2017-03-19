import React, { Component } from 'react';
import {
    NetInfo,
    Text,
    ListView,
    View,
    TextInput,
    Button
} from 'react-native';
import Expense from './expense';

export default class Billfold extends Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({}, this._clearExpense());
    }

    componentWillMount() {
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

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

    renderRow(rowData) {
        return (
            <Expense
                purpose={rowData.purpose}
                category={rowData.category}
                amount={rowData.amount}
                date={rowData.date}
                removable={this.props.connected}
                onRemove={() => this._remove(rowData.id)}
            />
        )
    }

    _clearExpense() {
        return {
            newExpensePurpose: '',
            newExpenseCategory: '',
            newExpenseAmount: '',
            newExpenseDate: ''
        };
    }

    _isValidExpense() {
        if (this.state.newExpensePurpose && this.state.newExpenseCategory && this.state.newExpenseAmount && !isNaN(this.state.newExpenseAmount)) {
            return true
        }
        return false
    }

    _add() {
        if (this._isValidExpense()) {
            this.props.addExpense(
                this.state.newExpensePurpose,
                this.state.newExpenseCategory,
                this.state.newExpenseAmount,
                this.state.newExpenseDate
            );

            this.setState(this._clearExpense());
        }
    }

    _remove(id) {
        this.props.removeExpense(id);
    }

    render() {
        console.log(this.props);
        let expenses, readonlyMessage;

        if (this.props.connected) {
            expenses = this.props.onlineExpenses;
            readonlyMessage = <Text>Online</Text>
        } else if (this.props.connectionChecked) {
            expenses = this.props.offlineExpenses;
            readonlyMessage = <Text>Offline</Text>;
        } else {
            expenses = [];
            readonlyMessage = <Text>Loading...</Text>;
        }

        return (
            <View>
                {readonlyMessage}
                <TextInput
                    ref="newExpensePurpose"
                    placeholder="Purpose"
                    editable={this.props.connected}
                    value={this.state.newExpensePurpose}
                    onChangeText={(newExpensePurpose) => this.setState({newExpensePurpose})}
                />
                <TextInput
                    ref="newExpenseCategory"
                    placeholder="Category"
                    editable={this.props.connected}
                    value={this.state.newExpenseCategory}
                    onChangeText={(newExpenseCategory) => this.setState({newExpenseCategory})}
                />
                <TextInput
                    ref="newExpenseAmount"
                    placeholder="Amount"
                    editable={this.props.connected}
                    value={this.state.newExpenseAmount}
                    onChangeText={(newExpenseAmount) => this.setState({newExpenseAmount})}
                />
                <TextInput
                    ref="newExpenseDate"
                    placeholder="Date"
                    editable={this.props.connected}
                    value={this.state.newExpenseDate}
                    onChangeText={(newExpenseDate) => this.setState({newExpenseDate})}
                />
                <Button
                    title="Add Expense"
                    disabled={!this.props.connected}
                    onPress={() => this._add()}
                />

                <ListView
                    dataSource={this.dataSource.cloneWithRows(expenses)}
                    enableEmptySections={true}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        );
    }
}
