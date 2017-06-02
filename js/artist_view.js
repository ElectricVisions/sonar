import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export class ArtistView extends Component {
  render() {
    const artist = this.props.artist;
    let style = [styles.view]
    if (this.props.hidden) { style.push(styles.hidden) }

    return (
      <View
        onLayout={this.props.onLayout}
        style={style}
      >
        <Text style={styles.name}>
          {artist.name}
          <Text style={{color: 'grey', fontSize: 16}}> {artist.from}</Text>
        </Text>
        <Text style={{fontWeight: 'bold'}}>
          {artist.type.toUpperCase()} {artist.genre}
        </Text>
        <Text>{artist.time} {artist.location}</Text>
        <Text style={{color: 'black'}}>{artist.comment}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    backgroundColor: 'white',
    height: 115,
  },
  name: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hidden: {
    display: 'none',
  }
})
