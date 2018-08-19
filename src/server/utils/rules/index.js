import { readdir, lstat } from 'fs';
import { promisify } from 'util';
import { async } from '@utils';

import { readRule, readCommonRules, readSpecificRules } from './read';

const readdirAsync = promisify(readdir);
const lstatAsync = promisify(lstat);

async function filterFolders(files, path) {
  return async.filter(files, async file => {
    const filePath = `${path}/${file}`;

    const stat = await lstatAsync(filePath);
    return stat.isDirectory();
  });
}

async function composeRules(folderPath) {
  const [filter, common, specific] = await Promise.all([
    readRule(`${folderPath}/filter.js`),
    readCommonRules(`${folderPath}/common`),
    readSpecificRules(`${folderPath}/specific`),
  ]);

  return {
    filter,
    common,
    specific,
  };
}

export default async function getRules(path) {
  const files = await readdirAsync(path);
  const folders = await filterFolders(files, path);

  return async.reduce(
    folders,
    async (acc, folderName) => {
      const folderPath = `${path}/${folderName}`;
      const folderRules = await composeRules(folderPath);
      const accumulator = await acc;

      return Object.assign(accumulator, { [folderName]: folderRules });
    },
    {},
  );
}
