export const ADD_ALERT = 'ADD_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export const addAlert = alert => ({
  type: ADD_ALERT,
  alert,
});

export const removeAlert = id => ({
  type: REMOVE_ALERT,
  id,
});
