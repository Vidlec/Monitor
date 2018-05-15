import express from 'express';
import mongoose from 'mongoose';
import { Alert } from './models';

mongoose.connect('mongodb://127.0.0.1/test');

const alert = new Alert({
  name: 'Zildjian',
});
alert.save().then(() => console.log('meow'));

const app = express();

app.get('/', (req, res) => res.send('Hello World!!!'));

app.listen(3002, () => console.log('Example app listening on port 3002!'));
