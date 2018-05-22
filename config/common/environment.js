const argv = require('yargs').argv;

function environment() {
  const isDevelopment = argv.dev || false;
  const environmentType = isDevelopment ? 'development' : 'production';

  /* Update Node environment */
  process.env.NODE_ENV = environmentType;
  process.env.BABEL_ENV = environmentType;

  return environmentType;
}

const TYPE = environment();
const DEVELOPMENT = TYPE === 'development';

module.exports = {
  TYPE,
  DEVELOPMENT,
};
