import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import guideData from '../guide.json';
import { ArtistView } from './artist_view';
import { HeaderView } from './header_view';

export class GuideView extends Component {
  render() {
    const data = guideData.map( (section) =>
      <View key={`${section.day}${section.venue}`}>
        <HeaderView title={section.day}/>
        {section.artists.map( (artist) =>
          <ArtistView
            key={`${artist.location}${section.day}${artist.time}`}
            artist={artist}
          />
        )}
      </View>
    );

    return (
      <ScrollView
        style={{backgroundColor: 'rgb(233, 211, 218)'}}>
        {data}
      </ScrollView>
    );
  }
}
