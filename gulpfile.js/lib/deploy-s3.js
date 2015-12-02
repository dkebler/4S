var open    = require('open');
var s3config  = require('../config/deploy-s3');
var config = require('../config/');

var s3 = require('s3');
var client = s3.createClient();


// Deploy to S3 bucket
var deploySrc = config.buildDirectory + config.buildSubdirectory[config.buildType];  
process.env['AWS_PROFILE'] = s3config.profile;

console.log('deploy-s3', config.buildType, config.url, s3config.profile, s3config[s3config.location].bucket, deploySrc);

var params = {
  localDir: deploySrc,
  deleteRemoved: true, // default false, whether to remove s3 objects 
                       // that have no corresponding local file. 
 
  s3Params: {
    Bucket: s3config[s3config.location].bucket,
    ACL: 'public-read'
    // Prefix: "some/remote/dir/",  use prefix for subdirectory deploy
    // other options supported by putObject, except Body and ContentLength. 
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property 
  },
};
var uploader = client.uploadDir(params);
uploader.on('error', function(err) {
  console.error("unable to sync:", err.stack);
});
uploader.on('progress', function() {
  console.log("progress", uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function() {
  console.log("done uploading");
});

});


    


/*
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




