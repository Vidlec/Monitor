import { NodeVM } from 'vm2';

// TODO: Add error handling on exectution
export function executeScript(script, connection, data, additional) {
  return script(connection, data, additional);
}

function compileRules(specific, vm) {
  return Object.keys(specific).reduce((acc, key) => {
    const script = specific[key];
    return Object.assign(acc, {
      [key]: script ? vm.run(script) : null,
    });
  }, {});
}

/*
  This function is responsible for compiling rules into function
  This has added benefit of fast future exectution
  TODO: Add error handling on compile
*/
export function compileScripts(rules) {
  const vm = new NodeVM();

  return Object.keys(rules).reduce((acc, key) => {
    const rule = rules[key];
    const { filter, common, specific } = rule;

    return Object.assign(acc, {
      [key]: {
        filter: filter ? vm.run(filter) : null,
        common: common ? compileRules(common, vm) : null,
        specific: specific ? compileRules(specific, vm) : null,
      },
    });
  }, {});
}
