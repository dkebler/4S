// 4S - Super Static Site Starter Entry Point
'use strict';

const repoPath = __dirname + '/';
const configJSPath = require(repoPath + 'package').configjspath || repoPath + 'config/config.js'; // 'configjspath' is key in package.json.  If not set default is used
const mainConfigPath = require(repoPath + 'package').configpath || repoPath + 'config/default.cson'; // 'configdir' is key in package.json.  If not set /config is the default

let config = require(configJSPath);

init()
  .then(config => {
    // configs loaded ok load the debugger here
    //    console.log('the configs from init\n', config)
    // Build the cli
    //  console.log(config.lib.cli.build);
    let cli = config.lib.cli.build(config);
    // console.log(cli);
    config.lib.cli.start(cli, config.cliData.cprompt);
  })
  // Launch Cli here
  .catch(e => console.log('error', e));

//*************************************
// Intialize 4S Environment
// loads in main and cli configs and builds cli
//*******************************************


// TODO Code this as a generator using co https://github.com/tj/co or eventually ES7 async/await when available
//  see http://stackoverflow.com/questions/28250680/how-do-i-access-previous-promise-results-in-a-then-chain

function init() {

  // let initjobs = [];
  // initjobs[0] = config.load(mainConfigPath);
  // initjobs[1] = initjobs[0].then(mainConfig => {
  //   return config.load(repoPath + mainConfig.cliConfigPath);
  // });
  // initjobs[2] = initjobs[0].then(mainConfig => {
  //   return config.loadLibs(repoPath + mainConfig.dir.lib);
  // });

  let getMainConfig = config.load(mainConfigPath);
  let getCliConfig = getMainConfig.then(mainConfig => {
    return config.load(repoPath + mainConfig.cliConfigPath);
  });
  let getLibs = getMainConfig.then(mainConfig => {
    return config.loadLibs(repoPath + mainConfig.dir.lib);
  });

  return Promise.all([getMainConfig, getCliConfig, getLibs])
    .then(configs => {
      configs[0].cliData = configs[1]; // Add cli configuration data as a key in main config object
      configs[0].lib = configs[2]; //Add js libraries as a key to main config for easier access
      configs[0].lib.config = config; // Add in config file module for later use.
      return configs[0]; // now return merged main config file
    });
}
