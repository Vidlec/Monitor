import { fork } from 'child_process';

import { LIFE_CYCLE, DATABASE } from '../../const/messageTypes';
import gateways from './../../../../config/server/gateways';

import { logData } from './database';

export const handleForkData = data => {
  switch (data.message.type) {
    case LIFE_CYCLE:
      logData(data);
    case DATABASE:
      logData(data);
  }
};

export const initGateways = () => {
  const forks = gateways.map(gateway => ({
    name: gateway.name,
    fork: fork(gateway.path, [gateway.name]),
  }));

  forks.forEach(({ fork }) => {
    fork.on('message', handleForkData);
    fork.send({ hello: 'world' });
  });
  return forks;
};
