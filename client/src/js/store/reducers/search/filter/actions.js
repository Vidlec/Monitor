export const SET_HIT_STATUS = 'SET_HIT_STATUS';
export const CLEAR_FILTER = 'CLEAR_FILTER';

export const toggleHitStatus = value => ({
  type: SET_HIT_STATUS,
  value,
});

export const clearFilter = () => ({
  type: CLEAR_FILTER,
});
