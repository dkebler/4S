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
// read/write objects <> json files
var jsonfile = require('jsonfile')
// for pipe error handling
var plumber = require('gulp-plumber');
var onError = require('../lib/errorHandler')


/**************** PRECCOMPILE - SASS-SCSS  **************/
gulp.task('sass', function () {


//console.log('scss paths:' + scss_paths);
if (typeof config.sasspaths == 'undefined') {console.log('scss bower paths NOT retrieved');}
if (config.sasspaths == null) {console.log('no scss bower paths available');}

// Now process the scss
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
// ALL DONE


/***** Prepare and Array of Bower Library Paths to use with gulp node-sass in task above *****/



// Get array of paths for all bower sass libraries and put in sass.json file.  Will use this with node-sass 
gulp.task('sass-bower', function () {

var wd_config      = require('../config/wiredep');  

// hold bower sass/scss library paths
var sass = {};  

// add access to dev dependencies since that's what the scss libs are.
wd_config.devDependencies = 'true';   

// Let wiredep grab all the bower lib references
var bowerLibs = require('wiredep')(wd_config);

// get both .scss and .sass files, both will work with node-sass
if( "scss" in bowerLibs ) sass.paths = bowerLibs.scss;
if( "sass" in bowerLibs ) sass.paths = sass.paths.concat(bowerLibs.sass);
if ( !("sass" in bowerLibs || "scss" in bowerLibs)  ) {console.log("no sass or scss libs, exiting"); return;}

// libsass wants only the parent directory of each "main" file so remove the filenames
for (var i=0; i<sass.paths.length; i++){
  sass.paths[i] = require('path').dirname(sass.paths[i]);
}  

console.table(sass.paths); 

// now write them out to a json file that can be used in the node-sass call
//console.log(wd_config.directory);

jsonfile.writeFile(config.sasspathsfile, sass, function (err) {console.error(err)});

});