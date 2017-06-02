import React, { Component } from 'react'
import { FlatList, View, Text } from 'react-native'
import guideData from '../guide.json'
import { ArtistView } from './artist_view'
import { HeaderView } from './header_view'
import NowOn from './now_on'

const HEIGHT = 115

export class GuideView extends Component {
  constructor(props) {
    super(props)
    this.state = { selected: this.selectedDay() }
    this.handlePress = this.handlePress.bind(this)
  }

  selectedDay() {
    const date = this.props.dateTime.getDate()
    const time = this.props.dateTime.getHours() * 60 + this.props.dateTime.getMinutes()
    const dayNight = (time > (21 * 60 + 30) && date != 15) ? 1 : 0
    return guideData.filter( section => parseInt(section.date) === date )[dayNight]
  }

  nowOn() {
    return NowOn(this.props.dateTime, this.state.selected.artists)
  }

  componentDidMount() {
    setTimeout( () => this.list.scrollToIndex({index: this.nowOn().index()}), 200 )
  }

  handlePress(tab) {
    this.setState({ selected: guideData.find( section => section.key === tab ) })
  }

  render() {
    return (
      <View>
        <HeaderView
          selected={this.state.selected.key}
          tabs={guideData.map( section => section.key )}
          onPress={this.handlePress}
        />
        <FlatList
          ref={view => this.list = view}
          data={this.nowOn().sort(this.state.selected.artists).map( artist =>
            Object.assign({}, artist, {
              key: `${artist.location}${this.selectedDay().day}${artist.time}`
            }))}
          key={this.state.selected.key}
          renderItem={({item}) => <ArtistView artist={item}/>}
          getItemLayout={(data, index) => ( {length: HEIGHT, offset: HEIGHT * index, index} )}
          itemHeight={HEIGHT}
        />
      </View>
    )
  }
}
