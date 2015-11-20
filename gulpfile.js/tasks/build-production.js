var gulp         = require('gulp');
var runSequence = require('run-sequence');

// FIXME runSequence may not needed with gulp goes to 4.0+ replace with gulp.series or gulp.parallel.
gulp.task('build:production', function(cb) {
runSequence('clean',['sass', 'html'], cb);
});