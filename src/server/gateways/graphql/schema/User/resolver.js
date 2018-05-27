import { getComments, getUser, getUsers, getAlerts } from '@services';

export default {
  Query: {
    users: () => getUsers(),
    user: (root, args, context) => getUser({ _id: args.id }),
  },
  User: {
    comments: user => getComments({ userId: user._id.toString() }),
    password: () => 'no pasword!',
    acknowledgedAlerts: user =>
      getAlerts({ acknowledgedById: user._id.toString() }),
  },
};
