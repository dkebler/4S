var gulp = require('gulp');
var config = require('../config/');
var runSequence = require('run-sequence');

gulp.task('dev', function(done) {
config.buildType='dev';
config.url = 'localhost:' + config.localport;
build = require('../lib/build');
build(config,done);

function done(){info('serving at: ' + config.url + ' ,ready for live editing')}
});	

