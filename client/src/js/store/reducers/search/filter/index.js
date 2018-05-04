import initialState from './initial-state';

import * as actions from './actions';
import * as searchActions from '../actions';

const filter = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_HIT_STATUS:
      return state.set('didHeHitHer', action.value);

    case searchActions.CLEAR_SEARCH:
    case actions.CLEAR_FILTER:
      return state.set('didHeHitHer', false)
                  .set('shouldIncludeHidden', false);
    default:
      return state;
  }
};

export default filter;
