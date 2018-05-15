import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import restRouter from './gateways/rest/routes';

mongoose.connect('mongodb://127.0.0.1/test');

const app = express();

app.use(bodyParser.json());
app.use('/api', restRouter);
app.get('/', (req, res) => res.send('Hello World!!!'));

app.listen(3002, () => console.log('Example app listening on port 3002!'));
