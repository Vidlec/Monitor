const gulp = require('gulp');
const runSequence = require('run-sequence');
const config = require('../index');

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

const sequence = config.DEVELOPMENT ? devSequence : prodSequence;

gulp.task('build', () => {
  runSequence(...sequence);
});
