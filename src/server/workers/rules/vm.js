import { createContext, runInContext } from 'vm';

export function executeRule({ rule, data }) {
  const context = createContext({ data });
  return runInContext(rule, context);
}
