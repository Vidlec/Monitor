import gql from 'graphql-tag';

export const types = gql`
  type Query {
    users: [User]
  }

  type User {
    _id: ID
    userName: String
  }
`;

export const resolvers = {
  Query: {
    users: (root, args, context) => {
      return fetch('https://127.0.0.1:3002/api/users')
        .then(res => res.json())
        .then(data => data);
    },
  },
};
