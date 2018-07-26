import { NodeVM } from 'vm2';

// TODO: Add error handling on exectution
export function executeScript({ script }, data) {
  return script(data);
}

/*
  This function is responsible for compiling rules into function
  This has added benefit of fast future exectution
  TODO: Add error handling on compile
*/
export function compileScripts(scripts) {
  const vm = new NodeVM();

  return scripts.map(({ name, code }) => {
    return {
      name,
      script: vm.run(code),
    };
  });
}
