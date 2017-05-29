import React, { Component } from 'react';
import { View, Text } from 'react-native';

export class ArtistView extends Component {
  render() {
    const artist = this.props.artist;

    return (
      <View onLayout={this.props.onLayout}
        style={{
        padding: 5,
        margin: 5,
        backgroundColor: 'white'
      }}>
        <Text style={{
          color: 'black',
          fontSize: 18,
          fontWeight: 'bold'
        }}>
          {artist.name}
          <Text style={{color: 'grey', fontSize: 16}}> {artist.from}</Text>
        </Text>
        <Text style={{fontWeight: 'bold'}}>{artist.type.toUpperCase()} {artist.genre}</Text>
        <Text>{artist.time} {artist.location}</Text>
        <Text style={{color: 'black'}}>{artist.comment}</Text>
      </View>
    )
  }
}
