import initialState from './initial-state';
import * as actions from './actions';

const filter = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_HIT_STATUS:
      return state.set('didHeHitHer', action.value);
    default:
      return state;
  }
};

export default filter;
