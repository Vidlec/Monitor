import { combineReducers } from 'redux-immutable';

import filter from './filter';
import initalState from './initial-state';

const search = (state = initalState, action) => {
  return state;
};

export default combineReducers({
  search,
  filter,
});
