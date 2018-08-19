import { readFile } from 'fs';

export default function getConfig() {
  return new Promise((resolve, reject) => {
    readFile(
      `${process.cwd()}/config/server/config.json`,
      'utf8',
      (err, file) => {
        if (err) reject(err);
        resolve(JSON.parse(file));
      },
    );
  });
}
