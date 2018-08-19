import chalk from 'chalk';

import { executeScript, compileScripts } from '@services/vm';

/* This handler handles running rule against incoming data */
export function handleRuleTask({ content, rulesStore }) {
  return new Promise((resolve, reject) => {
    console.log('[✓] Recieved rule task');

    const { data, connection } = content;

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

    resolve(result);
  });
}

export function handleRulesUpdate(rules, rulesStore) {
  console.log(chalk.green('[✓] Recieved rules update'));

  const compiledRules = compileScripts(rules);

  rulesStore.set(compiledRules);
}
