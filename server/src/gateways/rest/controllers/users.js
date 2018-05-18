import { getUser, getUsers, addUser, getComments } from '@services';

async function populateCommentsFor(user) {
  const comments = await getComments({ user: { _id: user._id } });
  user.comments = comments;
  return user;
}

function populateCommentsForUsers(users) {
  return Promise.all(users.map(populateCommentsFor));
}

export const get = (req, res, next) => {
  const {
    params: { id: _id },
  } = req;
  getUser({ _id })
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
    .then(users => populateCommentsForUsers(users))
    .then(users => res.json(users))
    .catch(next);
};
