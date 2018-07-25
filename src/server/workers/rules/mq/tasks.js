import chalk from 'chalk';
import dbTypes from '../../../const/databaseTypes';
import { toBuffer, toObject } from '../../../utils/mqData';

import { executeRule } from '../vm';

const queueName = 'rules_queue';

function sendDbTask(data, channel) {
  channel.assertQueue('database_queue', { exclusive: false, durable: false });
  console.log(chalk.blue('[#] Sending database task'));
  const task = { type: dbTypes.ALERT_ADD, data };
  channel.sendToQueue('database_queue', toBuffer(task));
}

/* This handler handles running rule against incoming data */
function handleRuleTask(msg, channel, rules) {
  console.log(chalk.green('[✓] Recieved rule task'));
  const { rule: ruleName, data } = toObject(msg.content);
  const rule = rules[ruleName];

  const {
    properties: { replyTo, correlationId },
  } = msg;

  const result = executeRule({ rule, data });
  console.log('result:', result);
  sendDbTask(result, channel);

  /* Send back the reply */
  channel.sendToQueue(replyTo, toBuffer(result), {
    correlationId,
  });
  channel.ack(msg);
}

export function awaitTasks({ rules, channel }) {
  channel.assertQueue(queueName, { durable: false });
  channel.prefetch(10);

  console.log(chalk.blue('[...] Awaiting rules tasks'));
  channel.consume(queueName, msg => handleRuleTask(msg, channel, rules));
}
