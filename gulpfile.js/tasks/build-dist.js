var gulp         = require('gulp');
var runSequence = require('run-sequence');

var build = 'dist';
// FIXME runSequence may not needed with gulp goes to 4.0+ replace with gulp.series or gulp.parallel.
gulp.task('build:dist', function(cb) {
runSequence('clean',['sass', 'html'], cb);
});