var gulp = require('gulp');
var config = require('../config/');

// using sync version
gulp.task('set-dist', function () {
  config.buildType = 'dist';
});

