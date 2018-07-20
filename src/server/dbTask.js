import mq from 'amqplib/callback_api';
import chalk from 'chalk';
import dbTypes from './const/databaseTypes';
import { toBuffer } from './utils/mqData';

const data = { identifier: 'testik', message: 'thisis from MQ' };

function handleMqConnection(error, connection) {
  connection.createChannel((error, channel) => {
    channel.assertQueue('database_queue', { exclusive: false, durable: false });
    console.log(chalk.blue('[#] Sending database task'));
    const task = { type: dbTypes.ALERT_ADD, data };

    channel.sendToQueue('database_queue', toBuffer(task));
  });
}

mq.connect('amqp://localhost', handleMqConnection);
