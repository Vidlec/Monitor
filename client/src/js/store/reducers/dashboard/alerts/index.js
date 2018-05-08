import { createId } from '@utils';
import { fromJS } from 'immutable';
import initialState from './initial-state';

import * as actions from './actions';

const alerts = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_ALERT: {
      const { alert } = action;
      return state.set(createId(), fromJS(alert));
    }

    case actions.REMOVE_ALERT: {
      return state.delete(action.id);
    }
    default:
      return state;
  }
};

export default alerts;
