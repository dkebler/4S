let cli = new require('vorpal');


let read = require(config.dir.lib + 'helpers').read;
let Promise = require('promise');

module.exports = {



  build: {},
  init: {}
}

function build(cliData) {

   cli
    .command('config [cmd]')
    .description('Manipulates Configuration File(s)')
    .alias('c')
    .action(function(args, callback) {
      switch (args.cmd) {
        case 'reload':
          // this.log('load');
          config = cfg.parseFile(configpath)
          if (config instanceof Error) {
            console.log(config.stack)
          } else {
            this.log(config)
          }
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

  }




  let config = load(configPath); // master object to hold all site configuration data
  if (config instanceof Error) {
    console.log('Error loading config\n', config.stack)
  } else {
    require(repoPath + config.dir.lib + 'debug'); // see debug.js in library dir to turn on/off/customize debugging
    Debug('config object\n', config);
    let cliData = load(cliDataPath); // object to hold all the command line (vorpal) commands/data
    if (cliData instanceof Error) {
      console.log('Error loading command line interface data\n', cliData.stack)
    } else {
      Debug('cli Data object\n', cliData);
      startCLI(config, cliData);
    }
  }



  Debug('in CLI\n', config, cliData);





  cli
    .delimiter(config.site.cliprompt || cliData.cprompt)
    .show()


}









// fs.readFile(configPath)
// 	.then((data) => {
//     config =
// 		console.log(data);
//  		})
// 	.catch((err) => {
// 		console.error(err);
// 	});

// readCfgFiles([configPath, cliDataPath]).then(function (results) {
//  console.log('done');
//   Debug(results);
//   // results is an array of the values stored in a.json and b.json
// }, function (err) {
//   // If any of the files fails to be read, err is the first error
//   console.log('errors', err);
// });

// read(configPath)
//   .then(res => {
//     config.build = res.build;
//     Debug('config file read', res.build)
//     return config;
//     })
//   // .then(read(cliData))
//   // .then((cliData) => {Debug('config file read')})
//   .catch(function(e) {console.log('error: ', e)})
//   ;
//
// console.log(config);


// if (config instanceof Error) {
//   console.log('unable to load config file' + config.stack)
// } else {
//   require(repopath + config.dir.lib + '/debug'); // see debug.js in library dir to turn on/off/customize debugging
//   var clidata = readcfg.parseFile(repopath + 'clidata.cson')
//   if (clidata instanceof Error) {
//     console.log('unable to load cli config file' + clidata.stack)
//   } else {
//     Debug('cli data loaded')
//   }
//   console.log('Now Managing Site "' + config.site.name + '"\ntype "help" for list of commands')




// cli
//   .command('config [cmd]')
//   .description('Manipulates Configuration File(s)')
//   .alias('c')
//   .action(function(args, callback) {
//     switch (args.cmd) {
//       case 'reload':
//         // this.log('load');
//         config = cfg.parseFile(configpath)
//         if (config instanceof Error) {
//           console.log(config.stack)
//         } else {
//           this.log(config)
//         }
//         break;
//       case 'list':
//         // this.log('list');
//         if (isEmpty(config)) {
//           this.log('config not loaded');
//         } else {
//           this.log(config);
//         }
//         break;
//       case 'write':
//         // this.log('write');
//         jsonfile.writeFile(configpath, config, {
//           spaces: 2
//         }, function(err) {
//           if (err) {
//             console.error(err)
//           }
//         })
//         break;
//       case 'build':
//         // this.log('build');
//         // load in all the configuration data
//         config = require('require-all')({
//           dirname: __dirname + '/' + 'config/js',
//           //filter      :  /^(?!.*test\.js|index\.js)([^\.].+)\.js(on)?$/
//           filter: /^(?!.*test\.js|index\.js)([^\.].+)\.js?$/
//         });
//         this.log(config);
//         break;
//       case 'edit':
//         this.log('edit');
//         break;
//       default:
//         this.log('run the help')
//     }
//     callback();
//   });
//
// cli
//   .command('development')
//   .description('Creates Development Build, watches files, syncs browser')
//   .alias('dev')
//   .action(function(args, cb) {
//     return new Promise(function(resolve, reject) {
//       if (!null) {
//         resolve();
//       } else {
//         reject("Better luck next time");
//       }
//     });
//   });
//
//  cli
// //  .delimiter(config.site.cliprompt)
//   .delimiter('test')
//   .show();
