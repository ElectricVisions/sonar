import React, { Component } from 'react';
import { View, Text, SectionList } from 'react-native';
import guideData from '../guide.json';
import { ArtistView } from './artist_view';
import { HeaderView } from './header_view';

export class GuideView extends Component {
  render() {
    const data = guideData.map( (section) => {
      return {
        data: section.artists.map( (artist) => ({
          key: `${artist.location}${section.day}${artist.time}`,
          name: artist.name,
          genre: artist.style,
          comment: artist.description,
          location: artist.location,
          type: artist.type,
          from: artist.from,
          time: artist.time
        }) ),
        key: `${section.day} ${section.venue}`
      };
    } );

    return (
      <SectionList
        style={{backgroundColor: 'rgb(233, 211, 218)'}}
        renderItem={({item}) =>
            <ArtistView artist={item}/>
        }
        renderSectionHeader={({section}) =>
            <HeaderView title={section.key}/>
        }
        sections={data}
      />
    );
  }
}
