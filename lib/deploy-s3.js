var s3config  = require('../config/deploy-s3');
var config = require('../config/');
var s3 = require('s3');

module.exports = function(cb) {

// set a profile in ~/.aws/credentials -  or see s3 documentation for other credential injection.
// The IAM user corresponding to this profile's credentials must have an access policy in AWS.
process.env.AWS_PROFILE = s3config.profile;

//use this or set region in S3 client options below, do not set for aws default region
// s3.AWS.config.region = s3config[s3config.location].region;
var client = s3.createClient({
  s3Options: {
 // if not using an aws profile (above) you might use these although would put them in ignored file , see s3 documentation    
//  accessKeyId: 'mykey',
//  secretAccessKey: 'mysecret',
    region: s3config[s3config.location].region
  }
});

var deploySrc = config.buildDirectory + config.buildSubdirectory[config.buildType];  

debug('deploy-s3', config.buildType, config.url, s3config.profile, s3config[s3config.location].bucket, deploySrc);

var params = {
  Bucket: s3config[s3config.location].bucket, /* required */
  ACL: 'public-read'
};

// bucket exists check?  no access from this s3 object.
/*s3.headBucket(params, function(err, data) {
  if (err) {debug('bucket ', params.Bucket, ' does not exit'); debug2(err, err.stack);} // an error occurred
  else     debug('bucket ', params.Bucket, ' exits with access');           // successful response
});*/

var params = {
  localDir: deploySrc,
  deleteRemoved: true, // default false, whether to remove s3 objects that have no corresponding local file. 
 
  s3Params: {
    // Bucket: s3config[s3config.location].bucket,
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
  debug2("progress", uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function() {
  info('done sycning ', deploySrc, 'to bucket', s3config[s3config.location].bucket );
  cb(); // call openit (or some other such callback)
}); 


 }



  







