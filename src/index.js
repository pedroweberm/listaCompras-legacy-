import React from 'react';

import {View} from 'react-native';

import {Provider} from 'react-redux';

import Routes from './routes';

import store from './store';

import DraggableButton from './components/DraggableButton';

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
  // <View styles={{flex: 1}}>
  //   <DraggableButton />
  // </View>
);

export default App;
