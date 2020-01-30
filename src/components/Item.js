import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import RemoveItemButton from './RemoveItemButton';
import ItemCheckbox from './ItemCheckbox';

import * as SessionItem from '../store/actions/sessionItem';
import {getImage} from '../services/api';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.8,
    aspectRatio: 3 / 1,
    borderRadius: 25,
    marginVertical: 10,
    padding: 30,
    elevation: 10,
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
  imageStyle: {
    opacity: 0.5,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
  },
});

const Item = ({item, updateItem, removeItem}) => {
  const dispatch = useDispatch();

  const addItemImage = (id, image) => {
    dispatch(SessionItem.addItemImage(id, image));
  };

  const image = useSelector(state => {
    return state.marketSession.sessions[
      state.marketSession.activeSession
    ].items.find(storedItem => item.id === storedItem.id).image;
  });

  useEffect(() => {
    (async function() {
      if (image === null) {
        const imageURL = await getImage(item.title);
        addItemImage(item.id, imageURL);
      }
    })();
  }, []);

  return (
    <ImageBackground
      source={{
        uri:
          image !== null
            ? image
            : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAflBMVEX////19fXY2NgAAACvr6/7+/vv7+/j4+Py8vLT09P5+fnr6+usrKy9vb21tbXk5OR+fn7GxsZTU1NhYWEqKioyMjKKioqRkZFbW1tJSUnCwsLd3d3MzMyenp53d3dRUVFvb29AQEAQEBA5OTlxcXEYGBgiIiKkpKQLCwuamppGEI0iAAACiElEQVR4nO3ZZ4+bQBCA4aEa2KWbjo3bmeT//8HslZzzIdJJUZKVzPtIi7xuGsZ42CICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDvBeXOHB3bYVijI5HIT80hdW3HYknieR85cP3YdjCWBHvv8JYD5fuJ7WBsKb177OhUUl+ZqyK0Hc7/lmSrkqT3+mDKk2kMJEz1znZQ/5lavGYVd3ivA4GMWTZu7uYwnTyvUj97sc5ym9FYkmTN+XHe7laL4vR4GORGZC8UG8aiKI7po6+07/vptirC+XK5eN2jH83GxkrCrjR+uRkGgb1YbAriRxLKbY6W3cOxfXR8v9zaGElkLYru46yDMjcty7Y2Wt4VbRlJPEfhFIY6e31m+vJDTyZQr7+6rwNXuzL6W10/MNe/qYSuOX8nzdTXb39KKivlLQdmvrC9gvhOpflHDmSrl8H7UqqzsREyAADAHwq3O2r8VGvbEfwralYSxZNI5LiuY9rHYlrsjk4ym0lDFLiv/WmqtDjxMy6wZkN1CnVfHeSwVGu3LKvq+6pzimVp1NoPB2mrfvBFD33jB1U1rLYj/uvUeZRcprE9R10lUtSJaVN2H7858TV0x6KSYyv6nO9jqbPuJvP96bZc5uG10FV1cQ27wuSgM3/76njry+V4WlR9OlXO8bvM12lvXsiOB1H3p1teVMO6i6f9nDafOWhv+RQFx/o0xy87vbznIN+neZUd6p2+Pt+cOm2aOrzth73b3kRurUlL3+x1VA/9kBb3qolPnZQvsr6cLzrom2v69Xc+iSSddktmOwq7nHYY2q1uvH/a6lYjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHztBxqgH6MxRKy4AAAAAElFTkSuQmCC',
      }}
      style={styles.itemContainer}
      imageStyle={styles.imageStyle}>
      <ItemCheckbox
        checkItem={() => {
          updateItem(item.id);
        }}
        checked={item.checked}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <RemoveItemButton
        removeItem={() => {
          removeItem(item.id);
        }}
      />
    </ImageBackground>
  );
};

export default Item;
