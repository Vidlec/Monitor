import { getComment, getComments, getUser } from '@services/connectors/mongo';

export default {
  Query: {
    comments: getComments,
    comment: (_, args, __) => getComment({ _id: args.id }),
  },
  Comment: {
    user: comment => getUser({ _id: comment.userId }),
  },
};
