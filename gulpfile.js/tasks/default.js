var gulp = require('gulp');
var config = require('../config/');
// gulp.task('default', ['build:development']);

config.buildType = 'dev'; // default is development
config.url = 'http://localhost:' + config.localport;  // add port for development url

gulp.task('default', ['build']);
