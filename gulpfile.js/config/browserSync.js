var config = require('./')

module.exports = {
  server: {
   baseDir: config.buildDirectory + config.buildSubdirectory[config.buildType]
  },
  files: [config.buildDirectory + config.buildSubdirectory[config.buildType] + '/**/*.html'],
  port:config.localport
}
