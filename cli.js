var cli = require('vorpal')();
var jsonfile = require('jsonfile');
var Hjson = require("hjson");
var fs=require("fs");


var config = {}; // master object to hold all configuration data
//config.repoRoot = __dirname;
// set config directory package.json or use default  ./config/
configpath = require(__dirname + '/package').configpath || __dirname + '/config/config.json'; // 'configdir' is key used in package.json


function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// uncomment a promise library if you want something other than the now built in.
// and be SURE to use "new" with every promise your create.

// Promise = require('any-promise');
// Promise = require("es6-promise").Promise
// Promise = require('q');
// Promise = require('bluebird');

// require('./debug'); // see debug.js in library to turn on/off/customize debugging

cli
  .command('config [cmd]')
  .description('Manipulates Configuration File(s)')
  .alias('c')
  .action(function(args, callback) {
    switch (args.cmd) {
      case 'load':
        // this.log('load');
        // check for fix existence first then succesful read, don't use require
        // config = require(configpath);

        config = Hjson.parse(fs.readFileSync(configpath, "utf8"), { keepWsc: true } );
        // parse, keep whitespace and comments
        // (they are stored in a non enumerable __WSC__ member)
        this.log(config.deploy.s3.testing.url);
//      this.log(Hjson.stringify(config, { keepWsc: true }));
        break;
      case 'list':
        // this.log('list');
        if (isEmpty(config)) {
          this.log('config not loaded');
        } else {
          this.log(config);
        }
        break;
      case 'write':
        // this.log('write');
        jsonfile.writeFile(configpath, config, {
          spaces: 2
        }, function(err) {
          if (err) {
            console.error(err)
          }
        })
        break;
      case 'build':
        // this.log('build');
        // load in all the configuration data
        config = require('require-all')({
          dirname: __dirname + '/' + 'config/js',
          //filter      :  /^(?!.*test\.js|index\.js)([^\.].+)\.js(on)?$/
          filter: /^(?!.*test\.js|index\.js)([^\.].+)\.js?$/
        });
        this.log(config);
        break;
      case 'edit':
        this.log('edit');
        break;
      default:
        this.log('run the help')
    }
    callback();
  });

cli
  .command('development')
  .description('Creates Development Build, watches files, syncs browser')
  .alias('dev')
  .action(function(args, cb) {
    return new Promise(function(resolve, reject) {
      if (!null) {
        resolve();
      } else {
        reject("Better luck next time");
      }
    });
  });

cli
  .delimiter('4S>')
  .show();
