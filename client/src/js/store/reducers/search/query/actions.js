export const CLEAR_QUERY = 'CLEAR_QUERY';
export const SET_QUERY = 'SET_QUERY';

export const clearQuery = () => ({
  type: CLEAR_QUERY,
});

export const setQuery = query => ({
  type: SET_QUERY,
  query,
});
