// PRECCOMPILE - SASS-SCSS  
var gulp         = require('gulp');
var browserSync  = require('browser-sync');
// for sass compiling
var process_sass = require('gulp-sass');  //uses node-sass
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
// config files
var config       = require('../config/');
var sass         = require('../config/sass');

// used to get console log in pipes
var gutil        = require('gulp-util');
// for pipe error handling
var plumber = require('gulp-plumber');
var onError = require('../lib/errorHandler')

gulp.task('sass', function () {

var dest = config.buildDirectory + config.buildSubdirectory[config.buildType] + sass.dest;

  return gulp.src(sass.src,sass.paths)
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(process_sass({includePaths: sass.paths}))
        .on('end', function(){ gutil.log('Libsass done...'); })
 // autoprefixer before sourcemaps write per gulp-autoprefixer   
    .pipe(autoprefixer(sass.autoprefixer))
        .on('end', function(){ gutil.log('Autoprefixer done...'); })
    .pipe(sourcemaps.write('.'))
        .on('end', function(){ gutil.log('SourceMaps Written...'); })
    .pipe(gulp.dest(dest))
           .on('end', function(){ gutil.log('Written to Destination ' + dest + ' - Sync Browser'); })
    .pipe(browserSync.reload({stream:true}));

});



