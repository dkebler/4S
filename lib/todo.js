var gulp = require('gulp');
var todos = require('gulp-comments');
var toconsole = require('./helpers').toconsole;
var config = require('../' + configfilepath); 

// var tlibs = gulp.src('./**/*.js').pipe(gettodos({fileName: '../libTODOS.md', reporter: 'markdown'}));

// gulp.src('./lib/**/*.js').pipe(gulp.dest('./temp'));
gulp.src(['./gulpfile.js', '.'+ config.libDirectory + '/**/*.js']).pipe(todos())
 .pipe(gulp.dest('./temp'))
;