import React, { Component } from 'react';
import { View, Text } from 'react-native';

export class HeaderView extends Component {
  render() {
    return (
      <Text style={{
        backgroundColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24}}>
        {this.props.title}
      </Text>
    )
  }
}
