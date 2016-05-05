// 4S - Super Static Site Starter Entry Point
'use strict';

let Promise = require('promise');

const repoPath = __dirname + '/';
const configJSPath = require(repoPath + 'package').configjspath || repoPath + 'config/config.js'; // 'configjspath' is key in package.json.  If not set default is used
const configPath = require(repoPath + 'package').configpath || repoPath + 'config/default.cson'; // 'configdir' is key in package.json.  If not set /config is the default

let load = require(configJSPath).load;

init().then( config => {
  // configs loaded ok load the debugger here
 console.log('the configs from init', config)})
 .catch(e => console.log('error', e));

//*************************************
// Intialize 4S Environment
// loads in main and cli configs and builds cli
//*******************************************

function init() {

  let loadConfig = load(configPath);
  let loadCliConfig = loadConfig.then(config => {
    load(repoPath + config.cliConfigPath);
    return load(config.cliConfigPath);
  });

  return Promise.all([loadConfig, loadCliConfig])
    .then(configs => {
      configs[0].cliData = configs[1];  // Merge cli configuration data as a key in main config object
      return configs[0]; // now return merged config file
    });
}
