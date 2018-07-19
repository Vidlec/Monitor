import chalk from 'chalk';

import { executeRule } from '../vm';

const queueName = 'rules_queue';

/* This handler handles running rule against incoming data */
function handleRuleTask(msg, channel, rules) {
  console.log(chalk.green('[✓] Recieved rule task'));
  const { rule: ruleName, data } = JSON.parse(msg.content.toString());
  const rule = rules[ruleName];

  const {
    properties: { replyTo, correlationId },
  } = msg;

  const result = executeRule({ rule, data });

  /* Send back the reply */
  channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(result)), {
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
