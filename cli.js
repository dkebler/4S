var cli = require('vorpal')();

var config = {};  // master object to hold all configuration data
// set config directory package.json or use default  ./config/
var configdir = require(__dirname + '/package').configdir || 'config';  // 'configdir' is key used in package.json
// load in all the configuration data
config.test = 'test';
console.log('before require-all',config);
config = require('require-all')({
  dirname     :  __dirname + '/' + configdir,
  filter      :  /^(?!.*test\.js|index\.js)([^\.].+)\.js(on)?$/,
});
config.repoRoot = __dirname;
config.directory = configdir;

console.log(config);

// uncomment a promise library if you want something other than the now built in.
// and be SURE to use "new" with every promise your create.

// Promise = require('any-promise');
// Promise = require("es6-promise").Promise
// Promise = require('q');
// Promise = require('bluebird');

// require('./debug'); // see debug.js in library to turn on/off/customize debugging

cli
  .command('config [file]')
  .option('-v, --verbose', 'Print foobar instead.')
  .description('Logs Configuration Files (default:indexjs)')
  .alias('gbl')
  .action(function(args, callback) {
     if (args.file) {
      this.log("./" + require(Config.libDirectory + "/" + args.file + '.js'));
     }
     else {
    this.log(args);
    this.log(Config);
    }
    callback();
  });

  cli
    .command('development')
    .description('Creates Development Build, watches files, syncs browser')
    .alias('dev')
    .action(function(args, cb){
      return new Promise(function(resolve, reject) {
        if (!null) {
          resolve();
        } else {
          reject("Better luck next time");
        }
      });
      });



cli
  .delimiter('4S$')
  .show();
