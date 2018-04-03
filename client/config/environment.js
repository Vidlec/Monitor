const argv = require('yargs').argv;

module.exports = function () {
    const isDevelopment = argv.dev || false;
    const environmentType = isDevelopment ? 'development' : 'production';

    /* Update Node environment */
    process.env.NODE_ENV = environmentType;
    process.env.BABEL_ENV = environmentType;

    return { type: environmentType };
}
