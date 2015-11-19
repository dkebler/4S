// PRECCOMPILE - SASS-SCSS  
var gulp         = require('gulp');
var browserSync  = require('browser-sync');
// for sass compiling
var process_sass = require('gulp-sass');  //uses node-sass
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
// config files
var config       = require('../config/sass');

// used to get console log in pipes
var gutil        = require('gulp-util');
// for pipe error handling
var plumber = require('gulp-plumber');
var onError = require('../lib/errorHandler')

gulp.task('sass', function () {
  return gulp.src(config.src,config.sasspaths)
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(process_sass({includePaths: config.sasspaths}))
        .on('end', function(){ gutil.log('Libsass done...'); })
 // autoprefixer before sourcemaps write per gulp-autoprefixer   
    .pipe(autoprefixer(config.autoprefixer))
        .on('end', function(){ gutil.log('Autoprefixer done...'); })
    .pipe(sourcemaps.write('.'))
        .on('end', function(){ gutil.log('SourceMaps Written...'); })
    .pipe(gulp.dest(config.dest))
           .on('end', function(){ gutil.log('Written to Destination - Sync Browser'); })
    .pipe(browserSync.reload({stream:true}));

});



