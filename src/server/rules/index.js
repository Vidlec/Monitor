import fs from 'fs';
import find from 'find';

import config from '../../../config/server/config';

function reduceRules(acc, { name, code, type }) {
  const rule = {
    name,
    [type]: code,
  };
  const rootName = acc[name] ? acc[name].name : name;

  return Object.assign(acc, {
    [rootName]: Object.assign(acc[rootName] || {}, rule),
  });
}

function getRule(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(`./${file}`, 'utf8', (err, data) => {
      if (err) reject(err);

      const isRule = /.*rules.js/.test(file);
      const isFilter = /.*filter.js/.test(file);

      // Remove new lines and trim
      resolve({
        type: isRule ? 'rule' : isFilter ? 'filter' : 'validation',
        name: file.replace(
          /.*\/|\.rules\.js|\.filter\.js|\.validate\.js/gm,
          '',
        ),
        code: data.replace(/(\n|\r)/gm, '').trim(),
      });
    });
  });
}

export function getRules() {
  return new Promise((resolve, reject) => {
    find
      .file(/rules\.js|filter.js|validate\.js/, config.rulesFolder, files => {
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
