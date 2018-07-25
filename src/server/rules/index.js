import fs from 'fs';
import find from 'find';

import config from '../../../config/server/config';

function reduceRules(acc, { name, code }) {
  const rule = {
    name,
    code,
  };

  return Object.assign(acc, { [name]: rule });
}

function getRule(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(`./${file}`, 'utf8', (err, data) => {
      if (err) reject(err);

      // Remove new lines and trim
      resolve({
        name: file.replace(/.*\/|\.rules.js/gm, ''),
        code: data.replace(/(\n|\r)/gm, '').trim(),
      });
    });
  });
}

export function getRules() {
  return new Promise((resolve, reject) => {
    find
      .file(/rules\.js/, config.rulesFolder, files => {
        const promises = files.map(getRule);
        Promise.all(promises).then(rules =>
          resolve(rules.reduce(reduceRules, {})),
        );
      })
      .error(err => {
        // TODO: handle error
        reject(err);
      });
  });
}

async function init() {
  const rules = await getRules();
  console.log(rules);
}

init();
