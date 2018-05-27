import { getAlerts, getAlert, getComments, getUser } from '@services';

export default {
  Query: {
    alerts: () => getAlerts(),
    alert: (root, args, context) => getAlert(),
  },
  Alert: {
    comments: alert => getComments({ alertId: alert._id.toString() }),
    acknowledgedBy: alert =>
      getUser({ _id: alert.acknowledgedById.toString() }),
  },
};
