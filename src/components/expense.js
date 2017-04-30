import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';
import Button from 'react-native-button';

export default class Expense extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    _formatDate(date) {
        const today = new Date();
        const dateDiff = date.getDate() - today.getDate();
        const monthDiff = date.getMonth() - today.getMonth();
        const yearDiff = date.getFullYear() - today.getFullYear();
        if (!dateDiff && !monthDiff && !yearDiff) {
            return `Today`;
        }
        return date.toDateString().substr(4, 6);
    }

    _categoryColor(category) {
        const colorMap = {
            food: '#FFBF00',
            shopping: '#FC404E',
            travel: 'royalblue',
            utilities: '#77D259',
            recharge: '#11C6E5',
            others: '#A66C59'
        };
        return {
            backgroundColor: colorMap[category]
        };
    }

    render() {
        const categories = {
            food: require('../icons/food.png'),
            shopping: require('../icons/shopping.png'),
            travel: require('../icons/travel.png'),
            utilities: require('../icons/utilities.png'),
            recharge: require('../icons/recharge.png'),
            others: require('../icons/others.png')
        };
        return (
            <View style={styles.expense}>
                <View style={styles.expense__left}>
                    {/*<Text style={styles.expense__category}>{this.props.category}</Text>*/}
                    <View style={[styles.expense__category, this._categoryColor(this.props.category)]}>
                        <Image source={categories[this.props.category]} style={{width: 25, height: 25}}/>
                    </View>
                </View>
                <View style={styles.expense__mid}>
                    <Text style={styles.expense__purpose}>{this.props.purpose}</Text>
                </View>
                <View style={styles.expense__right}>
                    <Text style={styles.expense__amount}>{this.props.amount}</Text>
                    <Text style={styles.expense__date}>{this._formatDate(new Date(this.props.date))}</Text>
                </View>

                {/*<Button
                    style={styles.button}
                    disabled={!this.props.removable}
                    styleDisabled={styles.buttonDisabled}
                    onPress={() => this.props.onRemove()}>
                    x
                </Button>*/}
            </View>
        )
    }
}

var styles = StyleSheet.create({
    expense: {
        backgroundColor: '#FFFFFF',
        borderColor: '#ebeff3',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 3,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        borderColor: 'red',
        color: 'red',
        borderWidth: 1,
        borderStyle: 'solid',
        width: 28,
        height: 28,
        borderRadius: 20,
        opacity: 0.3
    },
    expense__category: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6D74FC',
        borderRadius: 20,
        height: 40,
        width: 40,
        alignSelf: 'center'
    },
    expense__purpose: {
        fontSize: 14,
        marginLeft: 6,
    },
    expense__date: {
        color: '#d1d7dc'
    },
    expense__amount: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    expense__left: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    expense__mid: {
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 3
    },
    expense__right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'column'
    }
});
