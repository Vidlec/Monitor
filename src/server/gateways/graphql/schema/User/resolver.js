import {
  getComments,
  getUser,
  getUsers,
  getAlerts,
} from '@services/connectors/mongo';

export default {
  Query: {
    users: getUsers,
    user: (_, args, __) => getUser({ _id: args.id }),
  },
  User: {
    comments: user => getComments({ userId: user._id.toString() }),
    acknowledgedAlerts: user =>
      getAlerts({ acknowledgedById: user._id.toString() }),
  },
};
