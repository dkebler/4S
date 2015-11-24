var gulp = require('gulp');
const del = require('del');
var config = require('../config/');
var gutil = require('gulp-util');

/* this is promise async version of del and doesn't work with gulp run sequence currently
gulp.task('clean', function() {
	del([config.publicDirectory + '/**']).then(paths => {
	gutil.log('Deleted files and folders in : ', paths);
    });
});
*/

// using sync version
gulp.task('clean', function() {
	var dir = config.buildDirectory + config.buildSubdirectory[config.buildType]  + '/**'
	del.sync([dir]);
	gutil.log('Deleted files and folders in : ', dir );
});