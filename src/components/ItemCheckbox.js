import React from 'react';

import {TouchableOpacity, StyleSheet, Image} from 'react-native';

import checkIcon from '../assets/icons/checkIcon.png';

const styles = StyleSheet.create({
  removeButtonContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderWidth: 2,
    borderColor: '#333',
    elevation: 10,
  },
  removeIcon: {
    width: '100%',
    aspectRatio: 1 / 1,
    tintColor: '#333',
  },
});

const ItemCheckbox = ({checkItem, checked}) => {
  return (
    <TouchableOpacity onPress={checkItem} style={styles.removeButtonContainer}>
      <Image source={checked ? checkIcon : null} style={styles.removeIcon} />
    </TouchableOpacity>
  );
};

export default ItemCheckbox;
