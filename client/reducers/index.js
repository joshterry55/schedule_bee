import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user'
import assigned from './assigned'
import setdate from './setdate'
import flash from './flash'

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  setdate,
  assigned,
  flash
 });

export default rootReducer;
