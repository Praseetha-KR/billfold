import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    ListView,
    Image,
    ToolbarAndroid,
    Animated,
    Easing,
} from 'react-native';
import config from '../../config.js';

export default class ExpenseList extends Component {
    constructor() {
        super();

        this.state = {
            expenseList: this._dataSource().cloneWithRows(['']),
            spinLoader: new Animated.Value(0),
        }

        this.categoryIconList = {
            'food': require('../img/food.png'),
            'travel': require('../img/travel.png'),
            'supermarket': require('../img/supermarket.png'),
            'recharge': require('../img/recharge.png'),
            'e-shopping': require('../img/e_shopping.png'),
            'rent/wifi/hosting': require('../img/rent_wifi_hosting.png'),
            'transfers': require('../img/transfers.png'),
            'others': require('../img/others.png'),
        };
    }
    componentWillMount() {
        this._initLoader();

        this._fetchExpenses()
            .then(response => {
                this.setState({
                    expenseList: this._dataSource().cloneWithRows(response)
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title={config.APP_NAME}
                    subtitle='Expense List'
                    actions={toolbarActions}
                    onActionSelected={(e) => this._onActionSelected(e)}
                />
                <ScrollView style={styles.scroll}>
                    <ListView
                        dataSource={this.state.expenseList}
                        renderRow={ rowData => this._renderExpenseListCard(rowData) }
                    />
                </ScrollView>
            </View>
        );
    }

    _dataSource() {
        return new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    _initLoader() {
        this.state.spinLoader.setValue(0);
        Animated.timing(
            this.state.spinLoader,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }
        ).start(() => this._initLoader());
    }

    _fetchExpenses() {
        return fetch(config.EXPENSE_API_URL + '/expenses', {
                method: 'GET'
            }).then(res => res.json());
    }

    _onActionSelected(position) {
        this.props.navigator.push({
            id: toolbarActions[position].nav,
            title: toolbarActions[position].title
        });
    }

    _selectLink(nav) {
        this.props.navigator.push({
            id: nav,
            title: nav
        });
    }

    _renderExpenseListCard(rowData) {
        if (!rowData) {
            const spin = this.state.spinLoader.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
            });
            return (
                <View style={styles.loading}>
                     <Animated.Image style={{
                        width: 30,
                        height: 30,
                        transform: [{rotate: spin}]
                    }} source={require('../img/loader.png')} />
                </View>
            )
        }

        const row = JSON.parse(JSON.stringify(rowData));
        const d = new Date(row.date);
        const date = `${d.toDateString().slice(0, 10).toUpperCase()}`;



        return(
            <View style={styles.card}>
                <View style={styles.card__header}>
                    <Text style={styles.card__date}>{date}</Text>
                    <Text style={this._getExpenseSlabColors(row.total)}>&#8377;&nbsp;{row.total}</Text>
                </View>
                {this._renderCategoryRow(row, Object.keys(this.categoryIconList).slice(0,4), this.categoryIconList)}
                {this._renderCategoryRow(row, Object.keys(this.categoryIconList).slice(4,8), this.categoryIconList)}
            </View>
        );
    }
    _renderCategoryRow(expenseObj, categoryArr, iconList) {
        return (
            <View style={styles.card__categories}>
                {categoryArr.map((key, index) => {
                    return (
                        <View key={index} style={styles.category}>
                            <View style={styles.category__icon_wrapper}>
                                <Image
                                    style={styles.category__icon}
                                    source={iconList[key]}
                                />
                            </View>
                            <Text style={styles.category__label}>{expenseObj[key]}</Text>
                        </View>
                    );
                })}
            </View>
        );
    }
    _getExpenseSlabColors(number) {
        const n = parseInt(number);
        if (n < config.DAILY_TOTAL_LIMIT_SAFE) {
            return { color: config.THEME.safe };
        }
        if (n < config.DAILY_TOTAL_LIMIT_WARNING) {
            return { color: config.THEME.warning };
        }
        if (n < config.DAILY_TOTAL_LIMIT_DANGER) {
            return { color: config.THEME.danger };
        }
        if (n < config.DAILY_TOTAL_LIMIT_EXTREME) {
            return { color: config.THEME.extreme };
        }
        if (n > config.DAILY_TOTAL_LIMIT_EXTREME) {
            return { color: config.THEME.overflow };
        }
        return { color: config.THEME.dark };
    }
}

var toolbarActions = [
    {title: 'Add', show: 'always', nav: 'ExpenseAdd'},
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
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 150,
    },
    card: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: config.THEME.primary_border,
        borderRadius: 4,
        padding: 10,
        marginTop: 7,
        marginBottom: 7,
        marginLeft: 12,
        marginRight: 12,
        backgroundColor: config.THEME.light,
    },
    card__header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 7,
        marginLeft: 4,
        marginRight: 4,
    },
    card__date: {
        fontSize: 14,
        backgroundColor: config.THEME.accent,
        color: config.THEME.text_on_accent,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 4,
    },
    card__total: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    card__categories: {
        flexDirection: 'row'
    },
    category: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 4,
        flexDirection: 'row',
        backgroundColor: config.THEME.primary,
        borderRadius: 5,
    },
    category__icon_wrapper: {
        padding: 8,
    },
    category__icon: {
        height: 15,
        width: 15,
    },
    category__label: {
        marginLeft: 3,
    },
});
