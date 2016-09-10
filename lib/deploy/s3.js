'use strict';

let s3 = require('s3');

module.exports = function(data) {

// set a profile in ~/.aws/credentials -  or see s3 documentation for other credential injection.
// The IAM user corresponding to this profile's credentials must have an access policy in AWS.

let location = data.deploy[data.deploy.type][data.deploy[data.deploy.type].location]

process.env.AWS_PROFILE = location.profile;
Debug.L1('env profile: ', process.env.AWS_PROFILE);

var client = s3.createClient({
  s3Options: {
 // if not using an aws profile (above) you might use these although would put them in ignored file , see s3 documentation
//  accessKeyId: 'mykey',
//  secretAccessKey: 'mysecret',
    region: location.region  // bucket region is REQUIRED.
  }
});

Debug. L1('deploy-s3', data.build.type, data.build.url, location.profile, location.bucket, data.dir.dist);
//
// // TODO check bucket existence, make a bucket if need be
// // This works but can use module object need xx to be an aws-sdk object
// /*xx.headBucket(params, function(err, data) {
//   if (err) {Debug('bucket ', params.Bucket, ' does not exit'); Debug2(err, err.stack);} // an error occurred
//   else     Debug('bucket ', params.Bucket, ' exits with access');           // successful response
// });*/
//
let params = {
  localDir: data.dir.dist,
  deleteRemoved: true, // default false, whether to remove s3 objects that have no corresponding local file.
  s3Params: {
    Bucket: location.bucket,  /* required */
    ACL: 'public-read'
    // TODO add path in s3 config and use for prefix for subdirectory deploy
    // Prefix: "some/remote/dir/",  use prefix for subdirectory deploy
    // other options supported by putObject, except Body and ContentLength.
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  }
};

Debug.L1(params,location.bucket);

return new Promise( function(resolve,reject){

  var uploader = client.uploadDir(params);

    uploader
      .on('error', function(err) {console.error("unable to sync:", err.stack)})
      .on('progress', function() {Debug.L1("progress", uploader.progressAmount, uploader.progressTotal)})
      .on('end', function() {Debug.L1('done sycning ', data.dir.dist, 'to bucket:', location.bucket)})
      .on('end', resolve);

});  // end of promise


}
