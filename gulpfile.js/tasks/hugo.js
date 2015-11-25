var gulp         = require('gulp');
var exec = require('child_process').execSync;
var config     = require('../config/');
var hugo       = require('../config/hugo');
var gutil        = require('gulp-util');

gulp.task('hugo', function () {

var cmd = 'hugo -v' 
			+ ' --baseUrl="' + config.url  +  '"' 
			+ ' --config="' + hugo.configPath + '"'     
			+ ' --source="' + hugo.layouts + '"' 
			+ ' --destination="../../'+ config.buildDirectory + config.buildSubdirectory[config.buildType] + '"';
console.log('cmd: ' + cmd);

exec(cmd, function(error, stdout, stderr) {
    gutil.log('HugoBuilder Says: ' +  stdout);
    gutil.log(stdout);
        if (error !== null) {
        console.log('stderr: ' + stderr);
        console.log('exec error: ' + error);
    }

});

  
});


