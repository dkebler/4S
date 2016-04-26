var cli = require('vorpal')();
var jsonfile = require('jsonfile');

var config = {};  // master object to hold all configuration data
//config.repoRoot = __dirname;
// set config directory package.json or use default  ./config/
configpath = require(__dirname + '/package').configpath || __dirname + '/config/config.json';  // 'configdir' is key used in package.json


function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

// load in all the configuration data
// var config = Object.assign(config,
// require('require-all')({
//   dirname     :  __dirname + '/' + config.directory,
// //filter      :  /^(?!.*test\.js|index\.js)([^\.].+)\.js(on)?$/
//   filter      :  /^(?!.*test\.js|index\.js)([^\.].+)\.js?$/
//   })
// );

// var jsonfile = require('jsonfile')
// jsonfile.spaces = 4;
// var file = './config/config.json'
// jsonfile.writeFile(file, config, function (err) {
//   console.error(err)
// })

// console.log(config);

// uncomment a promise library if you want something other than the now built in.
// and be SURE to use "new" with every promise your create.

// Promise = require('any-promise');
// Promise = require("es6-promise").Promise
// Promise = require('q');
// Promise = require('bluebird');

// require('./debug'); // see debug.js in library to turn on/off/customize debugging

// cli
//   .command('config [cmd] [list] [edit]')
//   .description('Manipulates Configuration File(s)')
//   .action(function(args, callback) {
//     this.log(args);
//     if (args.load) {this.log('load') }
//     if (args.list) {this.log('list')
//     if (config !== {})
//      { this.log(config);}
//      else { this.log('config not loaded');}
//         }
//     if (args.edit) {this.log('edit') }
//     if (args.merge) {this.log('merge') }

    cli
      .command('config [cmd]')
      .description('Manipulates Configuration File(s)')
      .action(function(args, callback) {
        switch(args.cmd) {
        case 'load': this.log('load');
        config = require(configpath);
        break;
        case 'list':
        this.log('list');
        if (isEmpty(config))
         { this.log('config not loaded');}
         else { this.log(config);
            }
        break;
        case 'write': this.log('write');
        jsonfile.writeFile(configpath, config, {spaces: 2}, function (err) {
          if (err) {console.error(err)}
        })

        break;
        case 'merge': this.log('merge');
        // load in all the configuration data
        config = require('require-all')({
          dirname     :  __dirname + '/' + 'config',
        //filter      :  /^(?!.*test\.js|index\.js)([^\.].+)\.js(on)?$/
          filter      :  /^(?!.*test\.js|index\.js)([^\.].+)\.js?$/
        });
        this.log(config);


        break;
        case 'edit': this.log('edit'); break;
        default:
        this.log('run the help')
      }


//
// if (args.file) {
// this.log("./" + require(Config.libDirectory + "/" + args.file + '.js'));
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
