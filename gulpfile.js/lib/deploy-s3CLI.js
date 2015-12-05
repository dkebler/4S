var s3config  = require('../config/deploy-s3CLI');
var config = require('../config/');

var s3 = require('s3');
var client = s3.createClient({region: 'us-west-2',});

// Deploy to S3 bucket
var deploySrc = config.buildDirectory + config.buildSubdirectory[config.buildType];  
process.env.AWS_PROFILE = s3config.profile;

debug(process.env.AWS_PROFILE);

debug('deploy-s3CLI', config.buildType, config.url, s3config.profile, s3config[s3config.location].bucket, deploySrc);

// TODO write a helper function to create this string.  Try using lodash to get option key names

 var exec = require('child_process').exec; 
  var cmd = 'aws s3 sync ' + deploySrc + ' s3://'+ s3config[s3config.location].bucket
 // +'--profile '+ config.options.profile 
  + ' --grants '+ s3config.grants 
  + ' --delete '  
  // + ' --dryrun ' 
  ;
  // --profile '+ config.options.profile + ' --grants '+ config.options.grants +' --dryrun ' ;

  debug('cmd: ' + cmd);
  
  exec(cmd, function(error, stdout, stderr) {
          debug2('AWS-CLI Says: ' + stdout);
          if (error !== null) {
          console.log('stderr: ' + stderr);
          console.log('exec error: ' + error);
      }
  });

  







