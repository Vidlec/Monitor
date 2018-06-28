import { makeExecutableSchema } from 'graphql-tools';

import { QueryType } from './Query';
import { UserType } from './User';
import { CommentType } from './Comment';
import { AlertType } from './Alert';

import resolvers from '../resolvers';

export default makeExecutableSchema({
  typeDefs: [QueryType, UserType, CommentType, AlertType],
  resolvers,
});
