import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export class HeaderView extends Component {
  render() {
    const tabs = this.props.tabs.map( tab => {
        let style = [styles.tab]
        if (this.props.selected === tab) { style.push(styles.selected) }
        return <Text key={tab} style={style}>{tab}</Text>
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
