import mq from 'amqplib/callback_api';
import chalk from 'chalk';
import { handleDatabaseTask } from './dbHandler';
import { toObject } from '../../utils/mqData';

const queueName = 'database_queue';

function handleMqConnection(error, connection) {
  connection.createChannel((error, channel) => {
    channel.assertQueue(queueName, { durable: false });
    console.log(chalk.blue('[...] Awaiting database tasks'));

    channel.consume(queueName, message => {
      const task = toObject(message.content);
      console.log(chalk.green('[✓] Recieved database task'));

      handleDatabaseTask(task)
        .then(() => channel.ack(message))
        .catch(err => console.log(err));
    });
  });
}

export function listenForTasks() {
  mq.connect('amqp://localhost', handleMqConnection);
}
