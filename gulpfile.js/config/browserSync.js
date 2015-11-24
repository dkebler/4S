var config = require('./')

module.exports = {
  server: {
   // baseDir: config.buildDirectory + config.buildSubdirectory[config.buildType]
    baseDir: config.repoRoot +'/.builds/dev/'
  },
  files: [config.buildDirectory + config.buildSubdirectory[config.buildType] + '/**/*.html'],
  port:config.localport
}
