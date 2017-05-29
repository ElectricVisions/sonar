import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { GuideView } from './js/guide_view';

export default class SonarApp extends Component {
  render() {
    return (
      <GuideView/>
    );
  }
}


AppRegistry.registerComponent('sonarapp', () => SonarApp)
