import chalk from 'chalk';

import { replyTo } from '../publish';
import { executeScript } from '../../../../vm';
import { toObject } from '../../../../utils/mqData';

/* This handler handles running rule against incoming data */
export function handleRuleTask(message, channel, rules) {
  console.log(chalk.green('[✓] Recieved rule task'));
  const { rule: ruleName, data } = toObject(message.content);
  const rule = rules[ruleName];

  const result = executeScript({ rule, data });
  replyTo({ channel, message, data: result });
}
