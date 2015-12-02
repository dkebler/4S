var gulp         = require('gulp');
var open    = require('open');
var config = require('../config/');

// for debugging
// var gutil        = require('gulp-util');
var argv = require('yargs').argv;  
var runSequence = require('run-sequence');

gulp.task('deploy',function(cb) {

var deploy = 's3'; // default location
var argv = require('yargs').argv;  

if (argv.s3) deploy = 's3';
if (argv.gh) deploy = 'gh';

var dplyconfig = require('../config/deploy-' + deploy );

// build the distribution folder
config.buildType='dist'
config.url = dplyconfig[dplyconfig.location].url

console.log('deploying to', deploy, ', bucket:', dplyconfig[dplyconfig.location].bucket );


// runSequence('clean',['sass',config.htmlGenerator], deploy());

});


/* old AWS CLI code
gulp.src("./.build/dist/**")
   .pipe(s3({Bucket: "test.healthwrights.org"}));
*/

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




