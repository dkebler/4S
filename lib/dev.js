
var watch = require(Config.libDirectory + 'watch');

gulp.task('dev', function() {

// TODO all below to dev.js in /lib and require
  Config.buildType = 'dev';
  Config.url = 'localhost:' + Config.localport;

  return build()
    .then(res => Info('Dev Build Complete'))
    .then(watch)
    .then(res => Info('Watching Files - Start Editing'))
    .catch(function(e) {
      console.log('error: ', e)
    });
