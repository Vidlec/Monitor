import chalk from 'chalk';
import { databaseQueue } from '@const/queueNames';
import { replyTo } from '@services/mq';
import { toObject } from '@utils/mqData';

export function consumeDatabaseTasks({ channel, dbHandler }) {
  channel.assertQueue(databaseQueue, { durable: false });
  console.log(chalk.blue('[...] Awaiting database tasks'));

  channel.consume(databaseQueue, message => {
    const task = toObject(message.content);
    console.log(chalk.green('[✓] Recieved database task'));
    console.log(task);

    dbHandler(task)
      .then(data => {
        console.log(data);
        replyTo({ channel, message, data });
      })
      .catch(err => replyTo({ channel, message, data: err }));
  });
}
