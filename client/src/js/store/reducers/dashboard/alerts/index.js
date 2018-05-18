import { createId } from '@utils';
import { fromJS } from 'immutable';
import initialState from './initial-state';

import * as actions from './actions';

const alerts = (state = initialState, action) => {
  switch (action.type) {
    case actions.ALERT_ADD: {
      const { alert } = action;
      return state.set(createId(), fromJS(alert));
    }

    case actions.ALERT_REMOVE: {
      return state.delete(action.id);
    }

    case actions.ALERT_CLEAR: {
      return state.delete(action.id);
    }

    case actions.ALERT_SET_STATUS: {
      const { status, id } = action;
      return state.mergeIn([id, 'status'], fromJS(status));
    }

    default:
      return state;
  }
};

export default alerts;
