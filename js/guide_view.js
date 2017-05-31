import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import guideData from '../guide.json'
import { ArtistView } from './artist_view'
import { HeaderView } from './header_view'
import NowOn from './now_on'

export class GuideView extends Component {
  constructor(props) {
    super(props)
    this.state = {heights: []}
    this.handleLayout = this.handleLayout.bind(this)
    this.nowOn = this.nowOn.bind(this)
  }

  nowOn() {
    return NowOn(new Date(2017, 6, 17, 22, 0), guideData[2].artists)
  }

  handleLayout(event) {
    const heights = this.state.heights.concat(event.nativeEvent.layout.height)
    this.setState({
      heights: heights,
    })
    if (heights.length === this.nowOn().count) {
      setTimeout(() => {
        const position = heights.slice(0, this.nowOn().index() + 1).reduce((total, height) => total + height, 0)
        this.scrollView.scrollTo({y: position})
      }, 1)
    }
  }

  render() {
    const section = guideData[2]

    const data =
      <View
        key={`${section.day}${section.venue}`}>
        {this.nowOn().sort(section.artists).map( (artist) =>
          <ArtistView
            onLayout={this.handleLayout}
            key={`${artist.location}${section.day}${artist.time}`}
            artist={artist}
          />
        )}
      </View>

    return (
      <View>
        <HeaderView selected='Fri Night'/>
        <ScrollView
          ref={view => this.scrollView = view}
          style={{backgroundColor: 'rgb(233, 211, 218)'}}
        >
          {data}
        </ScrollView>
      </View>
    )
  }
}
