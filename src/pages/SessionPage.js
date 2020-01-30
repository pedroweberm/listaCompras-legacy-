import React, {useState} from 'react';

import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';

import {useSelector, useDispatch, connect} from 'react-redux';

import * as SessionItem from '../store/actions/sessionItem';

import Item from '../components/Item';
import ItemInputModal from '../components/ItemInputModal';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 50,
    paddingTop: 10,
  },
  newItemButtonContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SessionPage = () => {
  const [showModal, setShowModal] = useState(false);

  const updateItem = id => {
    dispatch(SessionItem.checkItem(id));
  };

  const removeItem = id => {
    dispatch(SessionItem.removeItem(id));
  };

  const dispatch = useDispatch();

  const active = useSelector(state => {
    return state.marketSession.activeSession;
  });

  const sessions = useSelector(state => {
    return state.marketSession.sessions;
  });

  const activeSessionData = sessions[active];

  const navigationOptions = {
    headerTitle: activeSessionData.title,
  };

  return (
    <>
      <ItemInputModal showModal={showModal} setShow={setShowModal} />
      <View style={styles.mainContainer}>
        <Text>{activeSessionData.title}</Text>
        <FlatList
          data={activeSessionData.items}
          extraData={activeSessionData}
          renderItem={({item}) => (
            <Item item={item} updateItem={updateItem} removeItem={removeItem} />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <View>
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
            }}>
            <Text>Novo Item</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SessionPage;
