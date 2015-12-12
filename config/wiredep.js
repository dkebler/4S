var config = require('./') // config/index.js
var bowerjson = require(config.repoRoot + "/bower.json"); 
var bowerrc = require('jsonfile').readFileSync(config.repoRoot + "/.bowerrc");

module.exports = {
directory: bowerrc.directory,
bowerJson: bowerjson,
  }

