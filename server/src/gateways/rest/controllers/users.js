import { getUser, getUsers, addUser } from '@services';
import { populateComments } from '../utils';

export const get = (req, res, next) => {
  const {
    params: { id: _id },
  } = req;
  getUser({ _id })
    .then(user => populateComments(user, { user: { _id: user._id } }))
    .then(user => res.json(user))
    .catch(next);
};

export const add = (req, res, next) => {
  const { body: user } = req;
  addUser(user)
    .then(user => res.json(user))
    .catch(next);
};

export const getAll = (req, res, next) => {
  const { query: props } = req;
  getUsers(props)
    .then(users =>
      Promise.all(
        users.map(user => {
          return populateComments(user, { user: { _id: user._id } });
        }),
      ),
    )
    .then(users => res.json(users))
    .catch(next);
};
