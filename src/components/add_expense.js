import React, { Component } from 'react';
import {
    ToolbarAndroid,
    nativeImageSource,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput,
    Picker
} from 'react-native';
import Button from 'react-native-button';
import DatePicker from 'react-native-datepicker';
import config from '../../config.js';

export default class AddExpense extends Component {
    constructor(props) {
        super(props);
        this.state = this._emptyExpense();
    }

    _emptyExpense() {
        return {
            newExpensePurpose: '',
            newExpenseCategory: '',
            newExpenseAmount: '',
            newExpenseDate: new Date()
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
            this.props.addExpenseFn(
                this.state.newExpensePurpose,
                this.state.newExpenseCategory,
                this.state.newExpenseAmount,
                this.state.newExpenseDate
            );

            this.setState(this._emptyExpense());
            this._loadListView();
        }
    }

    _loadListView() {
        this.props.navigator.pop();
    }


    render() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title="New Expense"
                    titleColor="#6D74FC"
                    actions={toolbarActions}
                    onActionSelected={(e) => this._loadListView(e)}
                />
                <ScrollView style={styles.scroll}>
                    <View>
                        <Picker
                            ref="newExpenseCategory"
                            placeholder="Category"
                            editable={this.props.connected}
                            selectedValue={this.state.newExpenseCategory}
                            onValueChange={(newExpenseCategory) => this.setState({newExpenseCategory})}
                        >
                            <Picker.Item label="Food" value="food" />
                            <Picker.Item label="Travel" value="travel" />
                            <Picker.Item label="Shopping" value="shopping" />
                            <Picker.Item label="Recharge" value="recharge" />
                            <Picker.Item label="Utilities" value="utilities" />
                            <Picker.Item label="Others" value="others" />
                        </Picker>
                        <TextInput
                            ref="newExpenseAmount"
                            placeholder="Amount"
                            editable={this.props.connected}
                            value={this.state.newExpenseAmount}
                            onChangeText={(newExpenseAmount) => this.setState({newExpenseAmount})}
                        />
                        <TextInput
                            ref="newExpensePurpose"
                            placeholder="Purpose"
                            editable={this.props.connected}
                            value={this.state.newExpensePurpose}
                            onChangeText={(newExpensePurpose) => this.setState({newExpensePurpose})}
                        />
                        <DatePicker
                            ref="newExpenseDate"
                            placeholder="Date"
                            editable={this.props.connected}
                            value={this.state.newExpenseDate}
                            style={{
                                width: -1, // full width
                                marginTop: 15
                            }}
                            date={this.state.newExpenseDate}
                            mode="date"
                            format="DD MMM YYYY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    marginLeft: 4,
                                    marginRight: 4,
                                    borderBottomColor: '#888',
                                    borderTopWidth: 0,
                                    borderLeftWidth: 0,
                                    borderRightWidth: 0,
                                    alignItems: 'flex-start'
                                }
                            }}
                            onDateChange={(newExpenseDate) => {this.setState({newExpenseDate})}}
                        />
                        <Button
                            style={styles.button}
                            disabled={!this.props.connected}
                            styleDisabled={styles.buttonDisabled}
                            onPress={() => this._add()}>
                            Save
                        </Button>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

var toolbarActions = [
    {title: 'CANCEL', show: 'always', nav: 'Timeline'},
];

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF5FA'
    },
    toolbar: {
        backgroundColor: '#EEF5FA',
        height: 56,
    },
    scroll: {
        padding: 20,
    },
    button: {
        fontSize: 18,
        backgroundColor: '#6D74FC',
        color: '#FFFFFF',
        padding: 12,
        paddingBottom: 15,
        borderRadius: 4,
        marginTop: 20,
        marginBottom: 40,
    },
    buttonDisabled: {
        backgroundColor: '#CCCCCC',
        color: '#EEF5FA'
    }
});
