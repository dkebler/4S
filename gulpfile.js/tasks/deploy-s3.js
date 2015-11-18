var gulp         = require('gulp');
var open    = require('open');
var config  = require('../config/deploy-s3');
var exec = require('child_process').exec;
// for debugging
// var gutil        = require('gulp-util');

// TODO live argument that switches to live bucket  => gulp deploy-s3 live
var bucket = config.testing.bucket;  //  change this line for live bucket 

gulp.task('deploy-s3', ['build:production'], function() {

  // TODO write a helper function to create this string.  Try using lodash to get option key names
  var cmd = 'aws s3 sync ' + config.src + ' s3://'+ bucket +' \
  --profile '+ config.options.profile + ' --grants '+ config.options.grants + ' --delete ';
  // --profile '+ config.options.profile + ' --grants '+ config.options.grants +' --dryrun ' ;

  console.log('cmd: ' + cmd);
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




