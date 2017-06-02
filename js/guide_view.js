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
  }

  selectedDay() {
    const date = this.props.dateTime.getDate()
    const time = this.props.dateTime.getHours() * 60 + this.props.dateTime.getMinutes()
    const dayNight = (time > (21 * 60 + 30) && date != 15) ? 1 : 0
    return guideData.filter( section => parseInt(section.date) === date )[dayNight]
  }

  nowOn() {
    return NowOn(this.props.dateTime, this.selectedDay().artists)
  }

  componentDidMount() {
    setTimeout( () => this.list.scrollToIndex({index: this.nowOn().index()}), 200 )
  }

  render() {
    return (
      <View>
        <HeaderView
          selected={this.selectedDay().key}
          tabs={guideData.map( section => section.key )}/>
        <FlatList
          ref={view => this.list = view}
          data={this.nowOn().sort(this.selectedDay().artists).map( artist =>
            Object.assign({}, artist, {
              key: `${artist.location}${this.selectedDay().day}${artist.time}`
            }))}
          key={this.selectedDay().key}
          renderItem={({item}) => <ArtistView artist={item}/>}
        />
      </View>
    )
  }
}
