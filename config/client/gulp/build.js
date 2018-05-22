const gulp = require('gulp');
const runSequence = require('run-sequence');
const environment = require('../../common/environment');

const prodBundle = [
  'clean:client',
  'clean:vendor',
  'bundle:vendor',
  ['bundle:client', 'copy:html', 'copy:fonts', 'styles:compile'],
];
const devBundle = [
  'clean:client',
  ['copy:html', 'copy:fonts', 'styles:compile'],
];

const prodSequence = [...prodBundle];
const devSequence = [...devBundle, ['serve']];

const sequence = environment.DEVELOPMENT ? devSequence : prodSequence;

gulp.task('build:client', () => {
  runSequence(...sequence);
});
