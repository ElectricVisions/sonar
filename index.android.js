import React, { Component } from 'react';
import { AppRegistry, View, Text, SectionList } from 'react-native';
import guideData from './guide.json';

class SonarApp extends Component {
  render() {
    const data = guideData.map( (section) => {
      return {
        data: section.artists.map( (artist) => ({
          key: artist.name,
            style: artist.style,
            description: artist.description
        }) ),
        key: `${section.day} ${section.venue}`
      };
    } );
    return (
      <SectionList
        renderItem={({item}) =>
            <View style={{paddingBottom: 10, paddingLeft: 10}}>
              <Text style={{fontWeight: "bold"}}>{item.key}</Text>
              <Text>{item.style}</Text>
              <Text>{item.description}</Text>
            </View>
        }
        renderSectionHeader={({section}) =>
            <Text style={{
              padding: 10,
              fontWeight: "bold",
              fontSize: 22}}>{section.key}</Text>}
        sections={data}
      />
    );
  }
}


AppRegistry.registerComponent('sonarapp', () => SonarApp)
