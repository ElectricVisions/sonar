import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { GuideView } from './js/guide_view';

export default class SonarApp extends Component {
  render() {
    let date = new Date()
    if ( !(date.getMonth() === 6 && [15, 16, 17].includes(date.getDate()))) {
      date = new Date(2017, 6, 15, 14, 30)
    }
    return (
      <GuideView dateTime={date}/>
    );
  }
}


AppRegistry.registerComponent('sonarapp', () => SonarApp)
