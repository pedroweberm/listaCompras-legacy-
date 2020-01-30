import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import Main from './pages/Main';
import SessionPage from './pages/SessionPage';

const rootNavigator = createStackNavigator({
  Main: {
    screen: Main,
  },
  SessionPage: {
    screen: SessionPage,
  },
});

export default createAppContainer(rootNavigator);
