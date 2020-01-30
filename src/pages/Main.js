import React from 'react';

import {View} from 'react-native';

import ListSessions from '../components/ListSessions';
import DraggableButton from '../components/DraggableButton';

const Main = () => {
  return (
    <View>
      <ListSessions />
      <DraggableButton />
    </View>
  );
};

export default Main;
