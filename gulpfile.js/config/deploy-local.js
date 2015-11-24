var config = require('./')

module.exports = {
  url: 'http://localhost:' + config.localport,
  src:  config.buildDirectory + config.buildSubdirectory[config.buildType]  + '/**'
}