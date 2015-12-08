var gulp = require('gulp');
var config = require('../config/');
var runSequence = require('run-sequence');

gulp.task('dev', function(done) {
config.buildType='dev';
config.url = 'localhost:' + config.localport;
build = require('../lib/build');
build(config,watch);

function watch() {
    info('dev build complete:  watching for changes');
    watchAll = require('../lib/watchAll');
    watchAll(config);
    }

});	


