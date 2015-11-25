var gulp = require('gulp');
const del = require('del');
var config = require('../config/');
var gutil = require('gulp-util');

// using sync version
gulp.task('clean', function() {
	console.log('clean', config.buildType);
	var dir = config.buildDirectory + config.buildSubdirectory[config.buildType]  + '/**'
	gutil.log('Deleted files and folders in : ', dir );
	del.sync([dir]);

});