import chalk from 'chalk';

import { executeScript, compileScripts } from '@services/vm';

/* This handler handles running rule against incoming data */
export function handleRuleTask({ content, rulesStore }) {
  return new Promise((resolve, reject) => {
    console.log('[✓] Recieved rule task');

    const { data, connection } = content;

    const rules = rulesStore.get();

    const ruleToExecute = Object.keys(rules).find(
      key => connection.gwType === key,
    );

    if (!ruleToExecute) resolve(null);

    const rule = rules[ruleToExecute];

    const { common, filter, specific } = rule;
    const afterPre = common.pre && executeScript(common.pre, connection, data);
    const specificToRun =
      filter && executeScript(filter, connection, data, afterPre);

    const afterSpecific =
      specificToRun && specific[specificToRun]
        ? executeScript(specific[specificToRun], connection, data, afterPre)
        : afterPre;

    const result = common.post
      ? executeScript(common.post, connection, data, afterSpecific)
      : afterSpecific;

    resolve(result);
  });
}

export function handleRulesUpdate(rules, rulesStore) {
  console.log(chalk.green('[✓] Recieved rules update'));

  const compiledRules = compileScripts(rules);

  rulesStore.set(compiledRules);
}
