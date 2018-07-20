import {
  getAlerts,
  getAlert,
  getComments,
  getUser,
} from '@services/connectors/mongo';

export default {
  Query: {
    alerts: getAlerts,
    alert: (_, args, __) => getAlert({ _id: args.id }),
  },
  Alert: {
    comments: alert => getComments({ alertId: alert._id.toString() }),
    acknowledgedBy: alert =>
      getUser({ _id: alert.acknowledgedById.toString() }),
  },
};
