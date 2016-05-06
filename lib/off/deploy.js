var view = require('open');

gulp.task('deploy', function() {

// TODO all below to deploy.js in /lib and require
// TODO Make deployment type default in the master file
  var deployto = 'gh'; // default change to 's3' if you want s3 to be the default
  if (Object.keys(argv)[1] !== '$0') {
    deployto = Object.keys(argv)[1]
  }

  Debug('arguments to deploy, all, 1, 2 :', argv, Object.keys(argv)[1], Object.keys(argv)[2]);

  Info('Starting deployment to', deployto);

  var cdeploy = require(Config.configDirectory + 'deploy-' + deployto);

  // see if location is other than default based on CLI arguments
//  if (Object.keys(argv)[2] !== undefined) ||  {
var loc = Object.keys(argv)[2];
// FIXME this doesn't catch undefined correctly need typeof(temp)
    if ([null,undefined,'$0'].indexOf(loc) === -1 ) {
      cdeploy.location = loc;
      Debug("taking location from command line=> ",loc)
    }

  Debug('deployment config: ', cdeploy);
  Debug('location: ', cdeploy.location);

  Config.buildType = 'dist';
  Config.url = cdeploy[cdeploy.location].url;

  Debug('deployurl', Config.url);

// load the specific deploy library
  var sync = require(Config.libDirectory + 'deploy-' + deployto);

  return build()
    .then(res => Info('build complete'))
    .then(sync)
    .then(res => Info('opening browser'))
    .then(view(('http://' + Config.url)))
    .catch(function(e) {
      console.log('error: ', e)
    });

});
