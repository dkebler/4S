var gulp = require('gulp');
var config = require('../config/');
var runSequence = require('run-sequence');

gulp.task('dev', function(done) {
config.buildType='dev';
config.url = 'localhost:' + config.localport;
console.log('building development, serving at', config.url )
//runSequence('build','watch');
runSequence('build',done);

function done(){console.log('all done ready for development/content editing')}
});	

