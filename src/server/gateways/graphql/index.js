import { makeExecutableSchema } from 'graphql-tools';

import { QueryType } from './schema/Query';
import { UserType } from './schema/User';
import { CommentType } from './schema/Comment';
import { AlertType } from './schema/Alert';

import resolvers from './resolvers';

export const schema = makeExecutableSchema({
  typeDefs: [QueryType, UserType, CommentType, AlertType],
  resolvers,
});
