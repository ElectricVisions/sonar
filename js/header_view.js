import React, { Component } from 'react';
import { View, Text } from 'react-native';

export class HeaderView extends Component {
  render() {
    return (
      <Text style={{
        color: 'black',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        margin: 10,
        fontWeight: 'bold',
        fontSize: 24}}>
        {this.props.title}
      </Text>
    )
  }
}
