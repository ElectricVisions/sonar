import React, { Component } from 'react';
import { AppRegistry, View, Text, SectionList } from 'react-native';
import guideData from './guide.json';
import { ArtistView } from './js/artist_view';
import { HeaderView } from './js/header_view';

class SonarApp extends Component {
  render() {
    const data = guideData.map( (section) => {
      return {
        data: section.artists.map( (artist) => ({
          key: artist.name,
            genre: artist.style,
            description: artist.description
        }) ),
        key: `${section.day} ${section.venue}`
      };
    } );

    return (
      <SectionList
        style={{backgroundColor: 'rgb(233, 211, 218)'}}
        renderItem={({item}) =>
            <ArtistView name={item.key}
              genre={item.genre}
              comment={item.description}/>
        }
        renderSectionHeader={({section}) =>
            <HeaderView title={section.key}/>
        }
        sections={data}
      />
    );
  }
}


AppRegistry.registerComponent('sonarapp', () => SonarApp)
