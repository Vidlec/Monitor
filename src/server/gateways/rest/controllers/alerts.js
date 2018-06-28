import { getAlert, getAlerts, deduplicateAlert } from '@services/mongo';

export const get = (req, res, next) => {
  const {
    params: { id },
  } = req;
  getAlert(id)
    .then(alert => res.json(alert))
    .catch(next);
};

export const post = (req, res, next) => {
  const { body: props } = req;
  deduplicateAlert(props)
    .then(alert => res.json(alert))
    .catch(next);
};

export const getAll = (req, res, next) => {
  const { body: props } = req;
  getAlerts(props)
    .then(alert => res.json(alert))
    .catch(next);
};
