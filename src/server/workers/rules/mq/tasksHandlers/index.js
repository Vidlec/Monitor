import chalk from 'chalk';
// import { ifElse } from 'ramda';

import { replyTo } from '@services/mq';
import { executeScript, compileScripts } from '@services/vm';
import { toObject } from '@utils/mqData';

/* This handler handles running rule against incoming data */
export function handleRuleTask(message, channel, rulesStore) {
  console.log(chalk.green('[✓] Recieved rule task'));
  const { data, connection } = toObject(message.content);
  console.log(data, connection);

  const rules = rulesStore.get();
  const ruleToExecute = Object.keys(rules).find(key =>
    executeScript(rules[key].filter, connection, data),
  );

  const shouldExecuteRule =
    ruleToExecute &&
    executeScript(rules[ruleToExecute].validation, connection, data);
  const result = shouldExecuteRule
    ? executeScript(rules[ruleToExecute].rule, connection, data)
    : null;

  replyTo({ channel, message, data: result });
}

export function handleRulesUpdate(message, _, rulesStore) {
  console.log(chalk.green('[✓] Recieved rules update'));
  const rules = toObject(message.content);
  const compiledRules = compileScripts(rules);
  rulesStore.set(compiledRules);
}
