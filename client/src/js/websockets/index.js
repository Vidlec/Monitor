import { removeAlert } from '@reducers/dashboard/alerts/actions';
import { store } from '../app';

// Simulate server response time
function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(5000));
}

export const socketRemoveAlert = ({ id }) =>
  setTimeout(() => {
    store.dispatch(removeAlert({ shouldHardRemove: true, id }));
  }, getRandom(5000));
