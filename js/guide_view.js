import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import guideData from '../guide.json'
import { ArtistView } from './artist_view'
import { HeaderView } from './header_view'
import NowOn from './now_on'

export class GuideView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.headerLayout = this.headerLayout.bind(this)
    this.artistLayout = this.artistLayout.bind(this)
  }

  headerLayout(event) {
    if(this.state.headerHeight) { return }
    this.setState({headerHeight: event.nativeEvent.layout.height})
  }

  artistLayout(event) {
    if(this.state.artistHeight) { return }
    this.setState({artistHeight: event.nativeEvent.layout.height})
    setTimeout(() => {
      this.scrollView.scrollTo({y: NowOn().y(
        this.state.headerHeight,
        this.state.artistHeight)})
    }, 0)
  }

  render() {
    const data = guideData.map( (section) =>
      <View key={`${section.day}${section.venue}`}>
        <HeaderView
          onLayout={this.headerLayout}
          title={section.day}/>
        {section.artists.map( (artist) =>
          <ArtistView
            onLayout={this.artistLayout}
            key={`${artist.location}${section.day}${artist.time}`}
            artist={artist}
          />
        )}
      </View>
    )

    return (
      <ScrollView
        ref={view => this.scrollView = view}
        style={{backgroundColor: 'rgb(233, 211, 218)'}}>
        {data}
      </ScrollView>
    )
  }
}
