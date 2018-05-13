const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('build:server', () => {
  runSequence('clean:server', 'bundle:server', 'start:server');
});
