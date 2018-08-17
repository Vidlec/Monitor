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
  `${config.DIST}/restGw.js`,
  `${config.DIST}/registration.js`,
];

gulp.task('start:server', callback => {
  if (environment.DEVELOPMENT) {
    nodemon({
      script: `${config.DIST}/main.js`,
      watch: `${config.DIST}/main.js`,
      env: { NODE_ENV: environment.TYPE },
    });

    if (argv.all) {
      workers.forEach(worker => {
        exec(`npx nodemon -w ${worker} ${worker}`, err => {
          callback(err);
        });
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
    return exec(`node ${config.DIST}/main.js`, (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      return callback(err);
    });
  }
});
