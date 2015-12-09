// PRECCOMPILE - SASS-SCSS  

var gulp         = require('gulp');
var gulpif = require('gulp-if');
var browserSync  = require('browser-sync'); 
var argv = require('yargs').argv;

// for sass compiling
var process_sass = require('gulp-sass');  //uses node-sass
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');

// config files
var config       = require('../config/');
var sass         = require('../config/sass');  

// for pipe error handling
var plumber = require('gulp-plumber');
var onError = require('../lib/errorHandler')

var dest = config.buildDirectory + config.buildSubdirectory[config.buildType] + sass.dest;

debug('Sass build type: ', config.buildType, ', output to: ',dest);
debug('Bower Sass Library Paths \n', sass.paths);

// Only minify when building distribution
// Only add sourcemaps and browser sync when building development
 gulp.src(sass.src,sass.paths)
    .pipe(plumber({errorHandler: onError}))
    .pipe(gulpif(config.buildType === 'dev',sourcemaps.init()))
    .pipe(process_sass({includePaths: sass.paths})).on('end', function(){ debug('Libsass done...'); })
 // autoprefixer before sourcemaps write per gulp-autoprefixer   
    .pipe(autoprefixer(sass.autoprefixer)).on('end', function(){ debug('Autoprefixer done...'); })
    .pipe(gulpif(config.buildType === 'dev',
        sourcemaps.write('.').on('end', function(){ debug('SourceMaps Written...'); })
        ))
    .pipe(gulpif(config.buildType === 'dist',
        minify().on('end', function(){ debug('CSS Minified...'); }) 
        ))    
      .pipe(gulp.dest(dest))
           .on('end', function(){ debug('Css written to ' + dest ); })
      .pipe(gulpif(config.buildType === 'dev',
        browserSync.stream().on('end', function(){ debug('Browser Synced...'); }) 
        ))    
     ;





