import { socketRemoveAlert } from '@websockets';

export const ALERT_ADD = 'ALERT_ADD';
export const ALERT_REMOVE = 'ALERT_REMOVE';
export const ALERT_SET_STATUS = 'ALERT_SET_STATUS';

export const setStatus = ({ status, id }) => {
  return {
    type: ALERT_SET_STATUS,
    status,
    id,
  };
};

export const addAlert = alert => ({
  type: ALERT_ADD,
  alert,
});

export const removeAlert = ({ shouldHardRemove = false, id }) => {
  if (shouldHardRemove)
    return {
      type: ALERT_REMOVE,
      id,
    };
  socketRemoveAlert({ id });
  return setStatus({ status: { isDeleting: true }, id });
};
