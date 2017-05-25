import React, { Component } from 'react';
import { AppRegistry, Text, View, ListView } from 'react-native';

class SonarApp extends Component {
  constructor() {
    super();
    const source = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: source.cloneWithRows(['row 1', 'row 2']),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />
    );
  }
}


AppRegistry.registerComponent('sonarapp', () => SonarApp)
