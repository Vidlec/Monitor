import fs from 'fs';
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import spdy from 'spdy';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import schema from './schema';

const CWD = process.cwd();

mongoose.connect('mongodb://127.0.0.1/test');

const app = express();

app.use(bodyParser.json());

// gql middleware
app.use('/graphql', graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Load TLS certificates and keys
const options = {
  key: fs.readFileSync(`${CWD}/config/common/cert/server.key`),
  cert: fs.readFileSync(`${CWD}/config/common/cert/server.crt`),
};

spdy
  .createServer(options, app)
  .listen(3003, () => console.log('Example app listening on port 3002!'));
