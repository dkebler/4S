var gulp         = require('gulp');
var exec = require('child_process').exec;
var config     = require('../config/');
var hugo       = require('../config/hugo');
var gutil        = require('gulp-util');

gulp.task('hugo', function () {

// TODO Build this as a function
var cmd = 'hugo -v' 
			+ ' --baseUrl="' + config.url  +  '"' 
			+ ' --config="' + hugo.configPath + '"'     
			+ ' --source="' + hugo.layouts + '"' 
			+ ' --destination="../../'+ config.buildDirectory + config.buildSubdirectory[config.buildType] + '"';
debug('cmd: ' + cmd);

exec(cmd,function (error, stdout, stderr) {
    debug2('HugoBuilder Says: ' +  stdout);
    
    if (error !== null) {
      console.log('stderr: ' + stderr);
      console.log('exec error: ' + error);
      }
    });

});


