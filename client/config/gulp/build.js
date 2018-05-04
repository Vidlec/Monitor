const gulp = require('gulp');
const runSequence = require('run-sequence');
const config = require('../index');

const prodBundle = ['clean:client', 'clean:vendor', 'bundle:vendor', ['bundle:client', 'svg:compile', 'copy:html']];
const devBundle = ['clean:client', ['copy:html', 'styles:compile']];

const prodSequence = [...prodBundle];
const devSequence = [...devBundle, ['serve']];

const sequence = config.DEVELOPMENT ? devSequence : prodSequence;

gulp.task('build', () => {
  runSequence(...sequence);
});
