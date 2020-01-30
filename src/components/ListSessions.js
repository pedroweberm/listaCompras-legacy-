import React, {useEffect} from 'react';

import {View, FlatList, Text, TouchableOpacity} from 'react-native';

import {withNavigation} from 'react-navigation';

import {connect} from 'react-redux';

import * as MarketSession from '../store/actions/marketSession';

import SessionItem from './SessionItem';
import SessionItemClass from './SessionItemClass';

const ListSessions = ({
  sessions,
  setActiveSession,
  addSession,
  removeSession,
  navigation,
}) => {
  const newSession = () => {
    const now = new Date();

    const today =
      String(now.getDay()) +
      '/' +
      String(now.getMonth()) +
      '/' +
      String(now.getFullYear());

    addSession(today);
  };

  const deleteSession = id => {
    removeSession(id);
  };

  return (
    <View style={{overflow: 'visible'}}>
      <TouchableOpacity onPress={newSession}>
        <Text>Adicionar Sessao</Text>
      </TouchableOpacity>
      <FlatList
        style={{paddingBottom: 20, overflow: 'visible'}}
        data={sessions}
        renderItem={({item}) => (
          <SessionItem
            item={item}
            setActiveSession={setActiveSession}
            deleteSession={deleteSession}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

{
  /* <FlatList
        data={sessions}
        renderItem={({item}) => (
          <SessionItem
            item={item}
            setActiveSession={setActiveSession}
            deleteSession={deleteSession}
          />
        )}
        keyExtractor={item => item.id}
        onScroll={event => {
          //console.warn(JSON.stringify(event.nativeEvent, null, 4));
        }}
      /> */
}

function mapStateToProps(state) {
  return {
    sessions: state.marketSession.sessions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveSession: id => dispatch(MarketSession.setActiveSession(id)),
    addSession: today => dispatch(MarketSession.addSession(today)),
    removeSession: id => dispatch(MarketSession.removeSession(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(ListSessions));
