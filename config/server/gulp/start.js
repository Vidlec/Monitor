const gulp = require('gulp');
const exec = require('child_process').exec;
const gwatch = require('gulp-watch');
const runSequence = require('run-sequence');
const nodemon = require('gulp-nodemon');
const argv = require('yargs').argv;

const config = require('../index');
const environment = require('../../common/environment');

const workers = [
  `${config.DIST}/rulesWorker.js`,
  `${config.DIST}/databaseWorker.js`,
  `${config.DIST}/restGw.js`,
];

const newTerminal = command => {
  return `${
    config.SCRIPTS
  }/newTerminal/macos.sh \"cd ${process.cwd()}/ && ${command}\"`;
};

gulp.task('start:server', callback => {
  if (environment.DEVELOPMENT) {
    nodemon({
      script: `${config.DIST}/main.js`,
      watch: `${config.DIST}/main.js`,
      env: { NODE_ENV: environment.TYPE },
    });

    if (argv.all) {
      workers.forEach((worker, index) => {
        const command = `npx nodemon -w ${worker} ${worker}`;
        exec(newTerminal(command, index));
      });
    }

    /* Declare watch tasks */
    const watch = (glob, tasks, callback) =>
      gwatch(glob, vinyl => {
        /* When provided custom callback, use it with current vinyl and passed tasks */
        if (callback) {
          return callback(vinyl, tasks);
        }

        /* Otherwise run through runSequence */
        return runSequence(...tasks);
      });
    watch(config.SRC, ['clean:server', 'bundle:server']);
  } else {
    if (argv.all) {
      workers.forEach(worker => {
        exec(`node ${worker}`, err => {
          callback(err);
        });
      });
    }
    return exec(`node ${config.DIST}/main.js`, (err, stdout, stderr) => {
      return callback(err);
    });
  }
});
