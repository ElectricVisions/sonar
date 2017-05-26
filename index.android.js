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
          comment: artist.description,
          location: artist.location,
          type: artist.type,
          from: artist.from
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
              comment={item.comment}
              location={item.location}
              type={item.type}
              from={item.from}
              />
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
