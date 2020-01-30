import {combineReducers} from 'redux';

import marketSession from './marketSession';
import sessionItem from './sessionItem';

export default combineReducers({
  marketSession,
  sessionItem,
});
