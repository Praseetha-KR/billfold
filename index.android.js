/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class billfold extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          BillFold
        </Text>
        <Text style={styles.tagline}>
          Expense Manager
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'powderblue',
  },
  heading: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    backgroundColor: '#FF6600',
    color: 'powderblue',
    paddingLeft: 10,
    paddingRight: 10,
    lineHeight: 50
  },
  tagline: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

AppRegistry.registerComponent('billfold', () => billfold);
