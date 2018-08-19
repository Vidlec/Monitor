import { existsSync, readFile, readdir } from 'fs';
import { promisify } from 'util';
import { async } from '@utils';

const readFileAsync = promisify(readFile);
const readdirAsync = promisify(readdir);

export function readRule(filter) {
  return readFileAsync(filter, 'utf8')
    .then(file => file)
    .catch(() => null);
}

export async function readCommonRules(path) {
  const folderExists = existsSync(path);
  if (!folderExists) return null;

  const [pre, post] = await Promise.all([
    readRule(`${path}/pre.rule.js`),
    readRule(`${path}/post.rule.js`),
  ]);

  return {
    pre: !!pre ? pre : null,
    post: !!post ? post : null,
  };
}

export async function readSpecificRules(path) {
  const folderExists = existsSync(path);
  if (!folderExists) return null;

  const files = await readdirAsync(path);
  const rules = files.filter(file => /.*rule.js/.test(file));

  return async.reduce(
    rules,
    async (acc, rule) => {
      const rulePath = `${path}/${rule}`;
      const ruleName = rule.replace(/.*\/|\.rule\.js/gm, '');

      const content = await readRule(rulePath, 'utf8');
      const accumulator = await acc;

      return Object.assign(accumulator, {
        [ruleName]: !!content ? content : null,
      });
    },
    {},
  );
}
