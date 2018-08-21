import { readFile } from 'fs';

export default function getConfig(path) {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf8', (err, file) => {
      if (err) reject(err);
      resolve(JSON.parse(file));
    });
  });
}
