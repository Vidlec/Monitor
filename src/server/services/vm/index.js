import { NodeVM } from 'vm2';

// TODO: Add error handling on exectution
export function executeScript(script, connection, data) {
  return script(connection, data);
}

/*
  This function is responsible for compiling rules into function
  This has added benefit of fast future exectution
  TODO: Add error handling on compile
*/
export function compileScripts(scripts) {
  const vm = new NodeVM();

  return Object.values(scripts).reduce(
    (acc, { name, rule, filter, validation }) => {
      return Object.assign(acc, {
        [name]: {
          rule: vm.run(rule),
          filter: vm.run(filter),
          validation: vm.run(validation),
        },
      });
    },
    {},
  );
}
