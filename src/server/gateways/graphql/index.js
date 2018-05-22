import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from '../../../shared/graphql/types';
import { getBooks } from './resolvers';

const resolvers = {
  Query: { books: getBooks },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
