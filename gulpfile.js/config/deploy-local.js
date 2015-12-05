var config = require('./')

// TODO set
module.exports = {
  url: '',
  src:  config.buildDirectory + config.buildSubdirectory[config.buildType]  + '/**'
}