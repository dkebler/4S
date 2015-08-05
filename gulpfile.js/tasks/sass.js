var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var config       = require('../config/sass');
var autoprefixer = require('gulp-autoprefixer');
var gutil        = require('gulp-util');

// loads up the paths for scss files in bower packages
gulp.task('sass-bower', function () {

var path  = require('path');
var sassBower    = require('main-bower-files');
var json = require('json-file');

var rcfile = path.resolve('.bowerrc');
console.log('bower rc:' + rcfile);
 
// Load a JSON file 
var bowerrc = json.read(rcfile);

console.log('bower directory:' + bowerrc.get('directory'));

var base_path = path.resolve(bowerrc.get('directory'));
   console.log('base_path:' + base_path); 

  // grab all the full paths
var scss_paths = sassBower({
  base: base_path,
  filter: '**/_*.scss',
  debugging: false,
  includeDev: true
  
});


for (var i=0; i<scss_paths.length; i++){
  // we need to use the parent directories of the main files, not the files themselves
  // so ./bower_components/bootstrap-sass-official/assets/stylesheets/_bootstrap.scss
  // becomes ./bower_components/bootstrap-sass-official/assets/stylesheets
  scss_paths[i] = path.dirname(scss_paths[i]);
}  

console.log('scss_paths:' + scss_paths); 

bowerrc.set('scss_paths', scss_paths);
bowerrc.writeSync();

});





gulp.task('sass', function () {

var path  = require('path');
var sassBower    = require('main-bower-files');

//////  This part loads in the scss paths stored in .bowerrc by the sass-bower task above
var json = require('json-file');
var rcfile = path.resolve('.bowerrc');
// console.log('bower rc:' + rcfile);
 
// Load a JSON file 
var bowerrc = json.read(rcfile);

/*
console.log(bowerrc.data);
console.log ('bower directory:' + bowerrc.get('directory'));
console.log('scss paths:' + bowerrc.get('scss_paths'));
*/ 

var scss_paths = bowerrc.get('scss_paths');


/////////////// Fix this so it gives an error if paths are not available.
//console.log('scss paths:' + scss_paths);
if (typeof scss_paths == 'undefined') {console.log('scss bower paths NOT retrieved');}
if (scss_paths == null) {console.log('no scss bower paths available');}

// Now process the scss
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
