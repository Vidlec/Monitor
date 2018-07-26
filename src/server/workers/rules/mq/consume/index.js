import chalk from 'chalk';

import { compileScripts } from '../../../../vm';
import { rulesQueue } from '../../../../const/queueNames';
import { toObject } from '../../../../utils/mqData';

import { handleRuleTask } from '../tasksHandlers';

export function consumeRuleTasks({ rules, channel }) {
  channel.assertQueue(rulesQueue, { durable: false });
  channel.prefetch(10); // TODO: Get from config

  console.log(chalk.blue('[...] Awaiting rules tasks'));
  channel.consume(rulesQueue, message =>
    handleRuleTask(message, channel, rules),
  );
}

export function consumeRegistration(queueName, channel) {
  channel.consume(
    queueName,
    message => {
      console.log(chalk.green('[✓] Recieved rules'));

      const rules = toObject(message.content);
      channel.ack(message);

      const compiledRules = compileScripts(rules);

      consumeRuleTasks({ rules: compiledRules, channel });
    },
    {
      noAck: false,
    },
  );
}
