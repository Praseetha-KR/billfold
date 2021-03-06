import React, { Component } from 'react';
import {
    ToolbarAndroid,
    nativeImageSource,
    ScrollView,
    StyleSheet,
    NetInfo,
    Text,
    ListView,
    View,
    TextInput,
    Navigator
} from 'react-native';
import Button from 'react-native-button';
import config from '../../config.js';
import Expense from './expense';

export default class Timeline extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    }

    _remove(id) {
        this.props.removeExpenseFn(id);
    }

    _loadAddView() {
        this.props.navigator.push({
            id: 'AddExpense',
            title: 'Add Expense'
        });
    }

    renderRow(rowData) {
        return (
            <View>
                <Text>{this.props.navigator.toString()}</Text>
                <Expense
                    navigator={this.props.navigator}
                    purpose={rowData.purpose}
                    category={rowData.category}
                    amount={rowData.amount}
                    date={rowData.date}
                    removable={this.props.connected}
                    onRemove={() => this._remove(rowData.id)}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title={config.APP_NAME}
                    titleColor="#6D74FC"
                    actions={toolbarActions}
                    onActionSelected={(e) => this._loadAddView(e)}
                />
                <ScrollView style={styles.scroll}>
                    <View>
                        {this.props.readonlyMessage}
                        <ListView
                            dataSource={this.dataSource.cloneWithRows(this.props.expenses)}
                            enableEmptySections={true}
                            renderRow={(e) => this.renderRow(e)}
                        />
                    </View>
                    <Button
                        style={styles.button}
                        onPress={(e) => this._loadAddView(e)}>
                        + Add Expense
                    </Button>
                </ScrollView>
            </View>
        );
    }
}

var toolbarActions = [
    { title: '+ NEW EXPENSE', show: 'always', nav: 'AddExpense' },
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
        paddingLeft: 10,
        paddingRight: 10,
    },
    button: {
        fontSize: 18,
        backgroundColor: '#6D74FC',
        color: '#FFFFFF',
        padding: 12,
        paddingBottom: 15,
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 20
    },
    buttonDisabled: {
        backgroundColor: '#CCCCCC',
        color: '#EEF5FA'
    }
});
