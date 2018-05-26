import { makeExecutableSchema } from 'graphql-tools';
import { getComments, getComment, getUser, getUsers } from '@services';
import { Query, User, Comment } from './types';

const resolvers = {
  Query: {
    users: () => getUsers(),
    user: (root, args, context) => getUser({ _id: args.id }),
    comments: () => getComments(),
    comment: (root, args, context) => getComment({ _id: args.id }),
  },
  Comment: {
    user: comment => getUser({ _id: comment.userId }),
  },
  User: {
    comments: user => getComments({ userId: user._id.toString() }),
    password: () => 'no pasword!',
  },
};

export const schema = makeExecutableSchema({
  typeDefs: [Query, User, Comment],
  resolvers,
});
