import 'babel-polyfill';

import { mqConnect, registerServe } from '@services/mq';

import { getRules } from './rules';

async function onConnectionSuccess(channel) {
  const rules = await getRules();
  registerServe(channel, rules);
}

mqConnect(onConnectionSuccess);
