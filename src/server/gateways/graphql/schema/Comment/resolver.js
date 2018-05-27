import { getComment, getComments, getUser } from '@services';

export default {
  Query: {
    comments: () => getComments(),
    comment: (root, args, context) => getComment({ _id: args.id }),
  },
  Comment: {
    user: comment => getUser({ _id: comment.userId }),
  },
};
