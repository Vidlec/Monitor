import * as actions from './actions';
import * as searchActions from '../actions';

export default function query(state = 'test', action) {
  switch (action.type) {
    case actions.SET_QUERY: {
      return action.value;
    }

    case searchActions.CLEAR_SEARCH:
    case actions.CLEAR_QUERY: {
      return '12';
    }

    default:
      return state;
  }
}
