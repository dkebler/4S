var gulp = require('gulp');
const del = require('del');
var argv = require('yargs').argv;
var gutil = require('gulp-util');


var config = require('../config/');

// using sync version
gulp.task('clean', function() {
	if (argv.dist) config.buildType='dist';    // gulp clean --dist     for one off clean of dist directory
	var dir = config.buildDirectory + config.buildSubdirectory[config.buildType];
	debug('cleaning', config.buildType, dir);
//  async promise version
    return del([dir + '/**']).then(paths => {
    debug2 ('Deleted files and folders:\n', paths.join('\n'));
    info ('Deleted folder : ' + dir);
    });
});