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

export default class AddExpense extends Component {
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

    render() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title={config.APP_NAME}
                    titleColor="#FFFFFF"
                    actions={toolbarActions}
                    onActionSelected={(e) => this._loadAddView(e)}
                />
                <ScrollView style={styles.scroll}>
                    <View>
                        {this.props.readonlyMessage}
                        <ListView
                            dataSource={this.dataSource.cloneWithRows(this.props.expenses)}
                            enableEmptySections={true}
                            renderRow={this.renderRow.bind(this)}
                        />
                    </View>
                    <Button
                        style={styles.button}
                        onPress={(e) => this._loadAddView(e)}>
                        +
                    </Button>
                </ScrollView>
            </View>
        );
    }
}

var toolbarActions = [
    {title: 'ADD', icon: require('../icons/clipboard.png'), show: 'always', nav: 'AddExpense'},
];

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF5FA'
    },
    toolbar: {
        backgroundColor: '#1374D3',
        height: 56,
    },
    scroll: {
        padding: 20,
    },
    button: {
        fontSize: 18,
        backgroundColor: '#0BD977',
        color: '#FFFFFF',
        padding: 12,
        paddingBottom: 15,
        borderRadius: 4,
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#CCCCCC',
        color: '#EEF5FA'
    }
});
