import { LIFE_CYCLE } from './const/messageTypes';

process.on('message', msg => {
  console.log('Message from parent:', msg);
});

setInterval(() => {
  process.send({
    name: process.argv[2],
    message: {
      type: LIFE_CYCLE,
      data: { event: 'ping', code: 200 },
    },
  });
}, 1000);
