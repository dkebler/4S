// PRECCOMPILE - SASS-SCSS

var gulp         = require('gulp');
var gulpif = require('gulp-if');

// for sass compiling
var process_sass = require('gulp-sass');  //uses node-sass
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');

// config files
var csass         = require('.' + Config.configDirectory + 'sass');

// for pipe error handling
var plumber = require('gulp-plumber');
var onError = require('../lib/errorHandler')

module.exports = function() {

var dest = Config.buildDirectory + Config.buildSubdirectory[Config.buildType] + csass.dest;

debug('Sass build type: ', Config.buildType, ', output to: ',dest);
debug2('Bower Sass Library Paths \n', csass.paths);

// Only minify when building distribution
// Only add sourcemaps and browser sync when building development

var done = new Promise( function(resolve,reject){
gulp.src(csass.src,csass.paths)
    .pipe(plumber({errorHandler: onError})) // not needed for gulp 4.0 and above
    .pipe(gulpif(Config.buildType === 'dev',sourcemaps.init()))
    .pipe(process_sass({includePaths: csass.paths})).on('end', function(){ debug('Libsass done...'); })
 // autoprefixer before sourcemaps write per gulp-autoprefixer
    .pipe(autoprefixer(csass.autoprefixer)).on('end', function(){ debug('Autoprefixer done...'); })
    .pipe(gulpif(Config.buildType === 'dev',
        sourcemaps.write('.').on('end', function(){ debug('SourceMaps Written...'); })
        ))
    .pipe(gulpif(Config.buildType === 'dist',
        minify().on('end', function(){ debug('CSS Minified...'); })
        ))
      .pipe(gulp.dest(dest))
//           .on('end', function(resolve){ debug('Css written to ' +  dest ); resolve; })
             .on('end', resolve )
       ;  //end of stream

     }); //end of Promise

     return done;  // return the promise

}
