var gulp = require('gulp');
var config = require('../config/');

// using sync version
gulp.task('set-dev', function () {
  config.buildType = 'dev';
});

