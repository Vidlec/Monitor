import fs from 'fs';

import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import spdy from 'spdy';

import restRouter from './gateways/rest/routes';
import { initGateways } from './services/cluster';

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

// initGateways();
