import React, { Component } from 'react'
import { FlatList, Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import guideData from '../guide.json'
import { ArtistView } from './artist_view'
import { HeaderView } from './header_view'
import NowOn from './now_on'

const HEIGHT = 115
const DEFAULT_DATE = new Date(2017, 6, 15, 14, 30)

export class GuideView extends Component {
  constructor(props) {
    super(props)
    this.state = this.setupState()
    this.handlePress = this.handlePress.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.setupState = this.setupState.bind(this)
  }

  setupState(selected) {
    let dateTime = new Date()
    if ( !(dateTime.getMonth() === 6 && [15, 16, 17].includes(dateTime.getDate()))) {
      dateTime = DEFAULT_DATE
    }
    selected = selected || this.selectedDay(dateTime)
    const nowOn = NowOn(selected.artists)
    return { dateTime, selected, nowOn }
  }

  selectedDay(dateTime) {
    const date = dateTime.getDate()
    const time = dateTime.getHours() * 60 + dateTime.getMinutes()
    const dayNight = (time > (21 * 60 + 30) && date != 15) ? 1 : 0
    return guideData.filter( section => parseInt(section.date) === date )[dayNight]
  }

  componentDidMount() {
    setTimeout( () =>  this.scrollToCurrent(), 200 )
  }

  scrollToCurrent() {
    this.list.scrollToIndex({index: this.state.nowOn.index(this.state.dateTime)})
  }

  handlePress(tab) {
    this.setState(this.setupState(guideData.find( section => section.key === tab )))
  }

  handleRefresh() {
    this.setState(this.setupState())
    this.componentDidMount()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderView
          selected={this.state.selected.key}
          tabs={guideData.map( section => section.key )}
          onPress={this.handlePress}
          onRefresh={this.setupState}
        />
        <FlatList
          style={{flex: 1}}
          ref={view => this.list = view}
          data={this.state.nowOn.sort().map( artist =>
            Object.assign({}, artist, {
              key: `${artist.location}${this.state.selected.day}${artist.time}`
            }))
          }
          key={this.state.selected.key}
          renderItem={({item}) => <ArtistView artist={item}/>}
          getItemLayout={(data, index) => ( {length: HEIGHT, offset: HEIGHT * index, index} )}
          itemHeight={HEIGHT}
        />
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={this.handleRefresh}>
          <Image
            source={require('../sync.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  refreshButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 48,
    height: 48,
  }
})
