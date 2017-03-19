import React, { Component } from 'react';
import {
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

        this.state = this._clearExpense();
    }

    componentWillMount() {
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    }

    renderRow(rowData) {
        return (
            <Expense
                purpose={rowData.purpose}
                category={rowData.category}
                amount={rowData.amount}
                date={rowData.date}
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
        let expenses = this.props.onlineExpenses;

        return (
            <View>
                <TextInput
                    ref="newExpensePurpose"
                    placeholder="Purpose"
                    value={this.state.newExpensePurpose}
                    onChangeText={(newExpensePurpose) => this.setState({newExpensePurpose})}
                />
                <TextInput
                    ref="newExpenseCategory"
                    placeholder="Category"
                    value={this.state.newExpenseCategory}
                    onChangeText={(newExpenseCategory) => this.setState({newExpenseCategory})}
                />
                <TextInput
                    ref="newExpenseAmount"
                    placeholder="Amount"
                    value={this.state.newExpenseAmount}
                    onChangeText={(newExpenseAmount) => this.setState({newExpenseAmount})}
                />
                <TextInput
                    ref="newExpenseDate"
                    placeholder="Date"
                    value={this.state.newExpenseDate}
                    onChangeText={(newExpenseDate) => this.setState({newExpenseDate})}
                />
                <Button
                    onPress={() => this._add()}
                    title="Add Expense"
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
