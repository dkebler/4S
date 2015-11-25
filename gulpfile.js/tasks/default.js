var gulp = require('gulp');
var config = require('../config/');
var runSequence = require('run-sequence');

gulp.task('default', function(cb) {
config.buildType='dev'
config.url = 'localhost:' + config.localport;
console.log('default', config.buildType, config.url )
runSequence('clean',['sass',config.htmlGenerator],'watch', cb);
});	
