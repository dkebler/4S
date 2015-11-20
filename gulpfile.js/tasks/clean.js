var gulp = require('gulp');
const del = require('del');
var config = require('../config/');
var gutil = require('gulp-util');


gulp.task('clean', function() {
	del([config.publicDirectory + '/**']).then(paths => {
	gutil.log('Deleted files and folders in : ', paths);
    });
});
