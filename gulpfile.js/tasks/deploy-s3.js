var gulp         = require('gulp');
var open    = require('open');
var s3config  = require('../config/deploy-s3');
var config = require('../config/');

// gulp.task('default', ['build:development']);
// default to testing bucket


// config.buildType = 'dist'; 
/*
// TODO make location available as a gulp task argument.  for now set in config file
config.url = s3config[s3config.location].url;
var bucket = s3config[s3config.location].bucket;

// var exec = require('child_process').exec;
// for debugging
// var gutil        = require('gulp-util');

console.log(config.url, bucket);

var s3 = require('gulp-s3-upload');
*/

gulp.task('deploy-s3', ['set-dist','build'], function() {
  console.log('some deploy stuff');

/*
gulp.src("")
        .pipe(s3(
             {Bucket: s3config[s3config.location].bucket}, 
             {maxRetries: 5}
             ));
 */            
});




/*  // TODO write a helper function to create this string.  Try using lodash to get option key names
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

*/




