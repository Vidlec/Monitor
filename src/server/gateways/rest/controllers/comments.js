import {
  getComment,
  getComments,
  addComment,
} from '@services/connectors/mongo';

export const get = (req, res, next) => {
  const {
    params: { id: _id },
  } = req;
  getComment({ _id })
    .then(alert => res.json(alert))
    .catch(next);
};

export const add = (req, res, next) => {
  const { body: comment } = req;
  addComment(comment)
    .then(alert => res.json(alert))
    .catch(next);
};

export const getAll = (req, res, next) => {
  const { body: props } = req;
  getComments(props)
    .then(alert => res.json(alert))
    .catch(next);
};
