import chalk from 'chalk';

import { compileScripts } from '@services/vm';
import { rulesQueue } from '@const/queueNames';
import { toObject } from '@utils/mqData';

import { handleRuleTask } from '../tasksHandlers';

export function consumeRuleTasks({ channel, message }) {
  const rules = toObject(message.content);
  const compiledRules = compileScripts(rules);

  channel.assertQueue(rulesQueue, { durable: false });
  channel.prefetch(10); // TODO: Get from config

  console.log(chalk.blue('[...] Awaiting rules tasks', rulesQueue));
  channel.consume(rulesQueue, message =>
    handleRuleTask(message, channel, compiledRules),
  );
}
