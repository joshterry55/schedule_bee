import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user'
import assigned from './assigned'
import setdate from './setdate'
import flash from './flash'
import setemployee from './setemployee'

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  setdate,
  assigned,
  flash,
  setemployee
 });

export default rootReducer;
