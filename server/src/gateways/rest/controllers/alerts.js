import { getAlert, getAlerts } from '@services';

export const alert = (req, res, next) => {
  const {
    params: { id },
  } = req;
  getAlert(id)
    .then(alert => res.json(alert))
    .catch(next);
};

export const alerts = (req, res, next) => {
  const { body: params } = req;
  getAlerts(params)
    .then(alert => res.json(alert))
    .catch(next);
};
