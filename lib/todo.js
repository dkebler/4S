var gulp = require('gulp');
var gettodos = require('gulp-comments');
var toconsole = require('./helpers').toconsole;
var config = require('..' + configfilepath); 

var  todos =  gulp.src([config.libDirectory + '/**/*','./gulpfile.js',config.assetsDirectory + 'styles/**/*'])
        .pipe(gettodos({reporter: 'markdown'}))
        .pipe(gulp.dest('./'));
  

