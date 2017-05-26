import React, { Component } from 'react';
import { View, Text } from 'react-native';

export class ArtistView extends Component {
  render() {
    return (
      <View style={{
        padding: 5,
        margin: 5,
        backgroundColor: 'white'
      }}>
        <Text style={{
          color: 'black',
          fontSize: 18,
          fontWeight: 'bold'
        }}>{this.props.name}</Text>
        <Text style={{fontWeight: 'bold'}}>{this.props.genre}</Text>
        <Text style={{color: 'black'}}>{this.props.comment}</Text>
      </View>
    )
  }
}
