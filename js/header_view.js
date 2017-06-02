import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export class HeaderView extends Component {
  constructor(props) {
    super(props)
    this.state = { selected: this.props.selected }
  }

  handlePress(tab) {
    this.setState({ selected: tab })
    this.props.onPress(tab)
  }

  render() {
    const tabs = this.props.tabs.map( tab => {
      let style = [styles.tab]
      if (this.state.selected === tab) { style.push(styles.selected) }
      return (
        <TouchableHighlight
          key={tab}
          onPress={ () => this.handlePress(tab)}
        >
          <Text style={style}>{tab}</Text>
        </TouchableHighlight>
      )
    })

    return (
      <View style={styles.header}>
        {tabs}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    maxWidth: 70,
    backgroundColor: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
  },
  selected: {
    color: 'black',
    backgroundColor: 'white',
  },
})
