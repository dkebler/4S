// Super Static Starter Entry Point

const repoPath = __dirname + '/';
const configJSPath = require(repoPath + 'package').configjspath || repoPath + 'config/config.js'; // 'configjspath' is key in package.json.  If not set default is used
const configPath = require(repoPath + 'package').configpath || repoPath + 'config/default.cson'; // 'configdir' is key in package.json.  If not set /config is the default

let loadconfig = require(configJSPath).load; // alternatively try this https://github.com/snowyu/load-config-file.js

loadconfig(configPath)
.then(config => console.log('config', config))
.catch(e => console.log('error', e));
