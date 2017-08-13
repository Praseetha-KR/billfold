import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    ToolbarAndroid,
} from 'react-native';
import config from '../../config.js';

export default class ViewExpense extends Component {
    constructor() {
        super();

        this.state = {
            expense: { date: '' },
        }

        this.categoryIconList = config.CATEGORY_ICONS;
    }
    componentWillMount() {
        this._getExpense()
            .then(response => {
                this.setState({
                    expense: response
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.date}</Text>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title={config.APP_NAME}
                    subtitle='Daily Expense'
                    actions={toolbarActions}
                    onActionSelected={(e) => this._onActionSelected(e)}
                />
                <ScrollView style={styles.scroll}>
                    <View style={styles.expense}>
                        <Text style={styles.date}>{this.state.expense['date']}</Text>
                        <View style={[styles.total, this._getExpenseSlabColors(this.state.expense['total'])]}>
                            <Text style={styles.total__count}>&#8377;&nbsp;{this.state.expense['total']}</Text>
                        </View>
                        {this._renderCategories(this.state.expense)}
                    </View>
                </ScrollView>
            </View>
        );
    }

    _renderCategories(expense) {
        return (
            <View style={styles.categories}>
                {Object.keys(this.categoryIconList).map((key) => {
                    return (
                        <View key={key} style={styles.category}>
                            <View style={styles.category__name}>
                                <View style={styles.category__icon_wrapper}>
                                    <Image
                                        style={styles.category__icon}
                                        source={this.categoryIconList[key]}
                                    />
                                </View>
                                <Text style={styles.category__label}>{`${key.charAt(0).toUpperCase()}${key.slice(1)}`}</Text>
                            </View>
                            <Text style={styles.category__value}>{expense[key]}</Text>
                        </View>
                    )
                })}
            </View>
        );
    }

    _getExpense() {
        // return fetch(config.EXPENSE_API_URL + '/expenses/' + this.props.date +'/', {
        //         method: 'GET'
        //     }).then(res => res.json());
    }

    _onActionSelected(position) {
        this.props.navigator.pop();
    }

     _getExpenseSlabColors(number) {
        const n = parseInt(number);
        if (n < config.DAILY_TOTAL_LIMIT_SAFE) {
            return { backgroundColor: config.THEME.safe };
        }
        if (n < config.DAILY_TOTAL_LIMIT_WARNING) {
            return { backgroundColor: config.THEME.warning };
        }
        if (n < config.DAILY_TOTAL_LIMIT_DANGER) {
            return { backgroundColor: config.THEME.danger };
        }
        if (n < config.DAILY_TOTAL_LIMIT_EXTREME) {
            return { backgroundColor: config.THEME.extreme };
        }
        if (n > config.DAILY_TOTAL_LIMIT_EXTREME) {
            return { backgroundColor: config.THEME.overflow };
        }
        return { backgroundColor: config.THEME.accent };
    }
}

var toolbarActions = [
    {title: 'x', show: 'always', nav: 'ExpenseList'},
];

var styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flex: 1,
    },
    toolbar: {
        backgroundColor: 'red',
        height: 56,
    },
    expense: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    date: {
        fontSize: 20,
        marginTop: 20,
    },
    total: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 100,
        marginTop: 20,
        marginBottom: 20,
    },
    total__count: {
        fontSize: 50,
        color: '#CCC'
    },
    categories: {
        width: 250,
        marginBottom: 100
    },
    category: {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    category__name: {
        flexDirection: 'row',
    },
    category__icon_wrapper: {
        marginRight: 10,
        width: 25,
    },
    category__icon: {
        width: 22,
        height: 22,
    }
});
