// 4S - Super Static Site Starter Entry Point
'use strict';

global.RepoPath = __dirname + '/';
global.Debug = require(require(RepoPath + 'package').configjspath || RepoPath + 'lib/debug.js');

// let debug = require(require(RepoPath + 'package').configjspath || RepoPath + 'lib/debug.js');

const configJSPath = require(RepoPath + 'package').configjspath || RepoPath + 'config/config.js'; // 'configjspath' is key in package.json.  If not set default is used
const mainConfigPath = require(RepoPath + 'package').configpath || RepoPath + 'config/default.cson'; // 'configdir' is key in package.json.  If not set /config is the default

let config = require(configJSPath);

// const cluster = require('cluster');
//
// if (cluster.isMaster) {
//   let app = cluster.fork();
//
//   app.on('message', (message) => {
//     Debug.L1('Message from App to Master:', message);
//     if (message.cmd === 'restart') {
//       Debug.L1('restaring app with fork');
//       //   Debug.L3(message.cli);
//       // process.exit(0);
//       //    need to reproduce the vorpal exit action here
//       //     .action(function (args) {
//       // args.options = args.options || {};
//       // args.options.sessionId = this.session.id;
//       // how to call this??
//       // this.parent.exit(args.options);
//       // });
//       cluster.fork({
//         OLD_CLI_PID: message.pid
//       });
//     }
//
//   });
// } else {
//   console.log('Staring App, pid: ', process.pid);
//
//   if (process.env.OLD_CLI_PID) {
//     Debug.L1('killing:',process.env.OLD_CLI_PID);
//     // process.kill(process.env.OLD_CLI_PID, 'SIGTERM');
//   }
//   start();
// }
//
//
//
// function start() {

  init()
    .then(config => {
      //Build CLI
      let cli = config.cli.lib.build(config);
      // Launch CLI
      config.cli.lib.start(cli, config.cli.cprompt);
      config.cli.emitter = cli;
    })
    .catch(e => console.log('error', e));
// }


//*************************************
// Intialize 4S Environment
// loads in main and cli configs and builds cli
//*******************************************


// TODO Code this as a generator using co https://github.com/tj/co or eventually ES7 async/await when available
//  see http://stackoverflow.com/questions/28250680/how-do-i-access-previous-promise-results-in-a-then-chain

function init() {

  let getMainConfig = config.load(mainConfigPath);
  let getCliData = getMainConfig.then(mainConfig => {
    return config.load(RepoPath + mainConfig.cliDataPath);
  });
  let getLibs = getMainConfig.then(mainConfig => {
    return config.loadLibs(RepoPath + mainConfig.dir.lib);
  });

  return Promise.all([getMainConfig, getCliData, getLibs])
    .then(configs => {
      configs[0].cli = configs[1]; // Add cli configuration data as a key in main config object
      configs[0].cli.lib = require(RepoPath + configs[0].cli.libPath); // add cli functions library
      configs[0].cli.actions = require(RepoPath + configs[0].cli.actionsPath); // add in cli action functions
      Debug.L3('cli-data', configs[0].cli);
      configs[0].lib = configs[2]; //Add js libraries as a key to main config for easier access
      configs[0].lib.config = config; // Add in config js module for later use.
      configs[0].repoPath = RepoPath; // add repo root path in case it is needed for absolute references
      return configs[0]; // now return merged main config file
    });
}