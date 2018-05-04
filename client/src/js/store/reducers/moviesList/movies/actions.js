export const ADD_MOVIE = 'ADD_MOVIE';
export const REMOVE_MOVIE = 'REMOVE_MOVIE';

export const addMovie = movie => ({
  type: ADD_MOVIE,
  movie,
});

export const removeMovie = id => ({
  type: REMOVE_MOVIE,
  id,
});
