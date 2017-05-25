import React, { Component } from 'react';
import { AppRegistry, Text, View, FlatList } from 'react-native';
import guideData from './guide.json';

class SonarApp extends Component {
  render() {
    const data = guideData.map( (section) => {
      return section.artists
    } ).reduce( (total, current) => total.concat(current), []
    ).map( (artist) => ({key: artist.name}) )
    return (
      <FlatList
        data={data}
        renderItem={({item}) => <Text>{item.key}</Text>}
      />
    );
  }
}


AppRegistry.registerComponent('sonarapp', () => SonarApp)
