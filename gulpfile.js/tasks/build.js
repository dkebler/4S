var gulp = require('gulp');
var config = require('../config/');
var runSequence = require('run-sequence');

gulp.task('build', function(cb) {
// could add in args for command line build, otherwise config must be set before coming here.
runSequence('clean',['sass',config.htmlGenerator],cb);
});	

