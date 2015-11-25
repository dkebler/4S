var gulp         = require('gulp');
var runSequence = require('run-sequence');
var config = require('../config/');

// FIXME runSequence may not needed with gulp goes to 4.0+ replace with gulp.series or gulp.parallel.
gulp.task('build', function(cb) {

console.log('in build',process.env.buildType);
if (config.buildType == 'dev') runSequence('clean',['sass',config.htmlGenerator], 'watch', cb);
if (config.buildType == 'dist') runSequence('clean',['sass',config.htmlGenerator], cb);
});