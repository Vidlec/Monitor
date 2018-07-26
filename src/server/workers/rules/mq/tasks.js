import chalk from 'chalk';
import dbTypes from '@const/databaseTypes';
import { toBuffer } from '@utils/mqData';

export function sendDbTask(data, channel) {
  channel.assertQueue('database_queue', { exclusive: false, durable: false });
  console.log(chalk.blue('[#] Sending database task'));
  const task = { type: dbTypes.ALERT_ADD, data };
  channel.sendToQueue('database_queue', toBuffer(task));
}
