import { createId } from '@utils';
import { fromJS } from 'immutable';
import initialState from './initial-state';

import * as actions from './actions';

const movies = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_MOVIE: {
      const { movie } = action;
      return state.set(createId(), fromJS(movie));
    }

    case actions.REMOVE_MOVIE: {
      return state.delete(action.id);
    }
    default:
      return state;
  }
};

export default movies;
