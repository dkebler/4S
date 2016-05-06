
var watch = require(Config.libDirectory + 'watch');

// reset to dev
Config.buildType = 'dev';
Config.url = 'localhost:' + Config.localport;


module.exports = function() {
  Debug('in dev');
  return build()
    .then(res => Info('Dev Build Complete'))
//   .then(watch)
//   .then(res => Info('Watching Files - Start Editing'))
    .catch(function(e) {console.log('error: ', e)
