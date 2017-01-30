import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user'
import assigned from './assigned'
import setdate from './setdate'
import flash from './flash'
import setemployee from './setemployee'
import setcompany from './setcompany'
import currentemployee from './currentemployee'
import editcompany from './editcompany'
import editemployee from './editemployee'
import contactlist from './contactlist'
import shiftdate from './shiftdate'
import showshift from './showshift'
import currentshifts from './currentshifts'
import shiftedit from './shiftedit'
import shiftdetails from './shiftdetails'
import weekdates from './weekdates'

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
  setdate,
  assigned,
  flash,
  setemployee,
  setcompany,
  currentemployee,
  editcompany,
  editemployee,
  contactlist,
  shiftdate,
  showshift,
  currentshifts,
  shiftedit,
  shiftdetails,
  weekdates
 });

export default rootReducer;
