var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var exec = require('child_process').execSync;
var handleErrors = require('../lib/handleErrors');
var config       = require('../config/html');
// var gutil        = require('gulp-util');


gulp.task('html', function () {

var cmd = 'hugo --destination="'+ config.dest +'" --buildDrafts --source='+ config.src;
console.log('cmd: ' + cmd);

exec(cmd, function(error, stdout, stderr) {
    console.log('Builder Says: ' + stdout);
        if (error !== null) {
        console.log('stderr: ' + stderr);
        console.log('exec error: ' + error);
    }
//   gutil.log(stdout);
});

  
});


