// PRECCOMPILE - SASS-SCSS  
var gulp         = require('gulp');
var argv = require('yargs').argv;


// config files
var config       = require('../config/');

gulp.task('sass', function () {

// could create alternative sass compiling other than --dev (default) or --dist
if (argv.dist) config.buildType='dist';    // gulp sass --dist     for one off sass distribution processing

require('../lib/sass');

});



