import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user'
import assigned from './assigned'
import setdate from './setdate'
import flash from './flash'
import setemployee from './setemployee'
import setcompany from './setcompany'

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  setdate,
  assigned,
  flash,
  setemployee,
  setcompany
 });

export default rootReducer;
