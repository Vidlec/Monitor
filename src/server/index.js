import fs from 'fs';
import { fork } from 'child_process';

import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import spdy from 'spdy';

import restRouter from './gateways/rest/routes';
import { LIFE_CYCLE, DATABASE } from './const/messageTypes';

const CWD = process.cwd();

mongoose.connect('mongodb://127.0.0.1/test');

const app = express();

app.use(bodyParser.json());
app.use('/api', restRouter);

// Load TLS certificates and keys
const options = {
  key: fs.readFileSync(`${CWD}/config/common/cert/server.key`),
  cert: fs.readFileSync(`${CWD}/config/common/cert/server.crt`),
};

spdy
  .createServer(options, app)
  .listen(3002, () => console.log('Example app listening on port 3002!'));

const handleForkLifecycle = data => {
  console.log(data);
};

const handleDbManipulation = data => {
  console.log(data);
};

function handleForkMessage(message) {
  switch (message.type) {
    case LIFE_CYCLE:
      handleForkLifecycle(message);
    case DATABASE:
      handleDbManipulation(message);
  }
}

const gateways = [
  { name: 'test1', path: './src/server/test.js' },
  { name: 'test2', path: './src/server/test2.js' },
];

export const forks = gateways.map(gateway => ({
  name: gateway.name,
  fork: fork(gateway.path, [gateway.name]),
}));

forks.forEach(({ fork }) => {
  fork.on('message', handleForkMessage);
  fork.send({ hello: 'world' });
});
