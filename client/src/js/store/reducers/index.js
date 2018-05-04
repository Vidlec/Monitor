import { combineReducers } from 'redux-immutable';
import search from './search';
import moviesList from './moviesList';

export default combineReducers({
  search,
  moviesList,
});
