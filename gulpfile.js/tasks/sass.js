var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var config       = require('../config/sass');
var autoprefixer = require('gulp-autoprefixer');
var gutil        = require('gulp-util');

///////////////
gulp.task('sass-bower', function () {

var path  = require('path');
var sassBower    = require('main-bower-files');

   console.log('current directory: ' + __dirname);  
var base_path = path.resolve('bower_components');
   console.log('base_path:' + base_path); 

  // grab all the full paths
var scss_paths = sassBower({
  base: base_path,
  filter: '**/_*.scss',
  debugging: true,
  includeDev: true
  
});


for (var i=0; i<scss_paths.length; i++){
  // we need to use the parent directories of the main files, not the files themselves
  // so ./bower_components/bootstrap-sass-official/assets/stylesheets/_bootstrap.scss
  // becomes ./bower_components/bootstrap-sass-official/assets/stylesheets
  scss_paths[i] = path.dirname(scss_paths[i]);
}  

console.log('scss_paths:' + scss_paths); 


});

///////////////////




gulp.task('sass', function () {

var path  = require('path');
var sassBower    = require('main-bower-files');

var base_path = path.resolve('bower_components');
//   console.log('base_path:' + base_path); 

  // grab all the full paths
var scss_paths = sassBower({
  base: base_path,
  filter: '**/_*.{scss,sass}',
//  debugging: true,
  includeDev: true
  
});

for (var i=0; i<scss_paths.length; i++){
  scss_paths[i] = path.dirname(scss_paths[i]);
}  

//   console.log('scss_paths:' + scss_paths); 


  return gulp.src(config.src,scss_paths)

    .pipe(sourcemaps.init())
    .pipe(sass({includePaths: scss_paths}))
        .on('error', handleErrors)
        .on('end', function(){ gutil.log('Libsass done...'); })
 // autoprefixer before sourcemaps write per gulp-autoprefixer   
    .pipe(autoprefixer(config.autoprefixer))
        .on('end', function(){ gutil.log('Autoprefixer done...'); })
    .pipe(sourcemaps.write('.'))
        .on('end', function(){ gutil.log('SourceMaps Written...'); })
    .pipe(gulp.dest(config.dest))
    
    .pipe(browserSync.reload({stream:true}));

});
