import { removeAlert } from '@reducers/dashboard/alerts/actions';
import { store } from '../app';

export const socketRemoveAlert = ({ id }) =>
  setTimeout(() => {
    store.dispatch(removeAlert({ shouldHardRemove: true, id }));
  }, 500);
