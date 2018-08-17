import chalk from 'chalk';

import { rulesTasksQueue } from '@const/queueNames';
import { rulesUpdateExchange } from '@const/exchangesNames';

import { handleRuleTask, handleRuleUpdate } from '../tasksHandlers';

export function consumeRuleTasks({ channel, rulesStore }) {
  channel.assertQueue(rulesTasksQueue, { durable: false });
  channel.prefetch(10); // TODO: Get from config

  console.log(chalk.blue('[...] Awaiting rules tasks on', rulesTasksQueue));
  channel.consume(rulesTasksQueue, message =>
    handleRuleTask(message, channel, rulesStore),
  );
}

export function consumeRulesUpdate({ channel, rulesStore }) {
  channel.assertExchange(rulesUpdateExchange, 'fanout', { durable: false });

  channel.assertQueue(
    '',
    { exclusive: true },
    (error, { queue }) => {
      console.log(
        chalk.blue('[...] Awaiting rules updates on', rulesUpdateExchange),
      );

      channel.bindQueue(queue, rulesUpdateExchange, '');

      channel.consume(queue, message =>
        handleRuleUpdate(message, channel, rulesStore),
      );
    },
    { noAck: true },
  );
}
