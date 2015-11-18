var config = require('./') // config/index.js
var bowerjson = require(config.appRoot + "/bower.json"); 
var bowerrc = require('jsonfile').readFileSync(config.appRoot + "/.bowerrc");

module.exports = {
directory: bowerrc.directory,
bowerJson: bowerjson,
  }

