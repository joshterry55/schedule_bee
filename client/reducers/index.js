import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user'
import setdate from './setdate'

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  setdate
 });

export default rootReducer;
