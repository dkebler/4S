var gulp = require('gulp');
var config = require('../config/');
// gulp.task('default', ['build:development']);

config.buildType = 'dev'; // default is development

gulp.task('default', ['build']);
