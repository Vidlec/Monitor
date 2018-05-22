import fs from 'fs';

import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import spdy from 'spdy';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import restRouter from './gateways/rest/routes';

const CWD = process.cwd();

mongoose.connect('mongodb://127.0.0.1/test');

const app = express();

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(bodyParser.json());
app.use('/api', restRouter);
app.use('/graphql', graphqlExpress({ schema, tracing: true }));
app.get('/', (req, res) => res.send('Hello World!!!'));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const options = {
  key: fs.readFileSync(`${CWD}/config/common/cert/server.key`),
  cert: fs.readFileSync(`${CWD}/config/common/cert/server.crt`),
};

spdy
  .createServer(options, app)
  .listen(3002, () => console.log('Example app listening on port 3002!'));
