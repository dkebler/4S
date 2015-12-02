// PRECCOMPILE - SASS-SCSS  
var gulp         = require('gulp');
var gulpif = require('gulp-if');
var browserSync  = require('browser-sync');
var argv = require('yargs').argv;

var console = require('../lib/debug');

// for sass compiling
var process_sass = require('gulp-sass');  //uses node-sass
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
// config files
var config       = require('../config/');
var sass         = require('../config/sass');

// used to get console log in pipes
var gutil        = require('gulp-util');
// for pipe error handling
var plumber = require('gulp-plumber');
var onError = require('../lib/errorHandler')

// BEGIN TASK SASS
gulp.task('sass', function () {

if (argv.dist) config.buildType='dist';    // gulp sass --dist     for one off sass distribution processing

var dest = config.buildDirectory + config.buildSubdirectory[config.buildType] + sass.dest;

console.log('sass - buildtype=', config.buildType);

  return gulp.src(sass.src,sass.paths)
    .pipe(plumber({errorHandler: onError}))
    .pipe(gulpif(config.buildType === 'dev',sourcemaps.init()))
    .pipe(process_sass({includePaths: sass.paths})).on('end', function(){ gutil.log('Libsass done...'); })
 // autoprefixer before sourcemaps write per gulp-autoprefixer   
    .pipe(autoprefixer(sass.autoprefixer)).on('end', function(){ gutil.log('Autoprefixer done...'); })
    .pipe(gulpif(config.buildType === 'dev',
        sourcemaps.write('.').on('end', function(){ gutil.log('SourceMaps Written...'); })
        ))
    .pipe(gulpif(config.buildType === 'dist',
        minify().on('end', function(){ gutil.log('CSS Minified...'); }) 
        ))    
      .pipe(gulp.dest(dest))
           .on('end', function(){ gutil.log('Css written to ' + dest ); })
 //   .pipe(browserSync.reload({stream:true}))
      .pipe(gulpif(config.buildType === 'dev',
        browserSync.stream().on('end', function(){ gutil.log('Browser Synced...'); }) 
        ))    
 // TODO  Promiseify this ?? I am returning a stream. 
     ;
});



