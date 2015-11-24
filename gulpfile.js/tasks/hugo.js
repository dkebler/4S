var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var exec = require('child_process').execSync;
var config     = require('../config/');
var hugo       = require('../config/hugo');
// var gutil        = require('gulp-util');

gulp.task('hugo', function () {

var cmd = 'hugo' 
			+ ' --baseUrl="' + config.url  + '"' 
			+ ' --config="' + hugo.configPath + '"'     
			+ ' --source="' + hugo.layouts + '"' 
			+ ' --destination="../../'+ config.buildDirectory + config.buildSubdirectory[config.buildType] + '"';
console.log('cmd: ' + cmd);

exec(cmd, function(error, stdout, stderr) {
 //   console.log('Builder Says: ' + stdout);
        if (error !== null) {
        console.log('stderr: ' + stderr);
        console.log('exec error: ' + error);
    }
//   gutil.log(stdout);
});

  
});


