import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    ToolbarAndroid,
} from 'react-native';
import Button from 'react-native-button';
import config from '../../config.js';

export default class ExpenseAdd extends Component {
    constructor() {
        super();

        this.state = {
            expense: { date: '' },
        }

        this.categoryIconList = config.CATEGORY_ICONS;
    }
    componentWillMount() {
        // this._getExpense()
        //     .then(response => {
        //         this.setState({
        //             expense: response
        //         });
        //     });
    }

    render() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title={config.APP_NAME}
                    subtitle='Daily Expense'
                    actions={toolbarActions}
                    onActionSelected={(e) => this._onActionSelected(e)}
                />
                <ScrollView style={styles.scroll}>
                    <View>
                        <TextInput
                        style={{height: 40}}
                        placeholder="Date"
                        onChangeText={(date) => this.setState({date})}
                        />
                        <Text>
                            {this.state.date}
                        </Text>
                    </View>
                    <View>
                        <TextInput
                        style={{height: 40}}
                        placeholder="Category"
                        onChangeText={(category) => this.setState({category})}
                        />
                        <Text>
                            {this.state.category}
                        </Text>
                    </View>
                    <View>
                        <TextInput
                            style={{height: 40}}
                            placeholder="Amount"
                            onChangeText={(amount) => this.setState({amount})}
                        />
                        <Text>
                            {this.state.amount}
                        </Text>
                    </View>
                    <View>
                        <TextInput
                            style={{height: 40}}
                            placeholder="Remarks"
                            onChangeText={(remarks) => this.setState({remarks})}
                        />
                        <Text>
                            {this.state.remarks}
                        </Text>
                    </View>
                    <View style={{marginTop: 20}}>
                        {/*<Button
                            title="Save Expense"
                            accessibilityLabel="Submission will edit expense for the category on the provided date"
                            color={config.THEME.accent}
                            onPress={this._validate}
                            style={{fontSize: 40}}
                        />*/}
                        <Button
                            style={{
                                fontSize: 20,
                                backgroundColor: config.THEME.accent,
                                color: config.THEME.light,
                                padding: 12,
                                paddingBottom: 15,
                                borderRadius: 4,
                            }}
                            styleDisabled={{color: 'red'}}
                            onPress={() => this._handlePress()}>
                            Save Expense
                        </Button>
                    </View>
                </ScrollView>
            </View>
        );
    }

    _validate() {

    }
    _postExpense() {
        return fetch(config.EXPENSE_API_URL + '/expenses/' + this.props.date +'/', {
                method: 'PUT'
            }).then(res => res.json());
    }

    _onActionSelected(position) {
        this.props.navigator.pop();
    }
}

var toolbarActions = [
    {title: 'x', show: 'always', nav: 'ExpenseList'},
];

var styles = StyleSheet.create({
    container: {
        backgroundColor: config.THEME.primary,
        flex: 1,
    },
    toolbar: {
        backgroundColor: config.THEME.primary,
        height: 56,
    },
    scroll: {
        padding: 20,
    }
});
