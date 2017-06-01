import React, { Component } from 'react'
import { FlatList, View, Text } from 'react-native'
import guideData from '../guide.json'
import { ArtistView } from './artist_view'
import { HeaderView } from './header_view'
import NowOn from './now_on'

export class GuideView extends Component {
  constructor(props) {
    super(props)

    this.nowOn = this.nowOn.bind(this)
    this.selectedDay = this.selectedDay.bind(this)

    this.dateTime = new Date(2017, 6, 16, 22, 0)
  }

  nowOn() {
    return NowOn(this.dateTime, guideData[2].artists)
  }

  selectedDay() {
    const date = this.dateTime.getDate()
    const time = this.dateTime.getHours() * 60 + this.dateTime.getMinutes()
    const dayNight = (time > (21 * 60 + 30) && date != 15) ? 1 : 0
    return guideData.filter( section => parseInt(section.date) === date )[dayNight].key
  }

  componentDidMount() {
    setTimeout( () => this.list.scrollToIndex({index: this.nowOn().index()}), 250 )
  }

  render() {
    const section = guideData[2]

    return (
      <View>
        <HeaderView
          selected={this.selectedDay()}
          tabs={guideData.map( section => section.key )}/>
        <FlatList
          ref={view => this.list = view}
          data={this.nowOn().sort(section.artists).map( artist =>
            Object.assign({}, artist, {
              key: `${artist.location}${section.day}${artist.time}`
            }))}
          key={section.key}
          renderItem={({item}) => <ArtistView artist={item}/>}
        />
      </View>
    )
  }
}
