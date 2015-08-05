var gulp         = require('gulp');
var open    = require('open');
var handleErrors = require('../lib/handleErrors');
var config  = require('../config/deploy');
var exec = require('child_process').exec;
// for debugging
// var gutil        = require('gulp-util');


gulp.task('deploy', ['build:production'], function() {
// gulp.task('deploy', function() { 

  // write a helper function to create this string.  Try using lodash to get option key names
  var cmd = 'aws s3 sync ' + config.src + ' s3://'+ config.testing.bucket +' \
  --profile '+ config.options.profile + ' --grants '+ config.options.grants;
  // --profile '+ config.options.profile + ' --grants '+ config.options.grants +' --dryrun ' ;

// console.log('cmd: ' + cmd);
  console.log('Writing Files from ' + config.src + ' to ' + config.testing.bucket);

  exec(cmd, function(error, stdout, stderr) {
  //   console.log('AWS-CLI Says: ' + stdout);
          if (error !== null) {
          console.log('stderr: ' + stderr);
          console.log('exec error: ' + error);
      }
  //   gutil.log(stdout);
  });

  open(config.testing.url,"firefox");

  
});




