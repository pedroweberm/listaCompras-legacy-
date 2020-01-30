import React from 'react';

import {TouchableOpacity, StyleSheet, Image} from 'react-native';

import trashIcon from '../assets/icons/trashIcon.png';

const styles = StyleSheet.create({
  removeButtonContainer: {
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    elevation: 10,
  },
  removeIcon: {
    width: '80%',
    aspectRatio: 1 / 1,
    tintColor: '#FFF',
  },
});

const RemoveItemButton = ({removeItem}) => {
  return (
    <TouchableOpacity onPress={removeItem} style={styles.removeButtonContainer}>
      <Image source={trashIcon} style={styles.removeIcon} />
    </TouchableOpacity>
  );
};

export default RemoveItemButton;
