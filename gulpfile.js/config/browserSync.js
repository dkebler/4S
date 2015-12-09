var config = require('./')

module.exports = {
  server: {
   baseDir: config.buildDirectory + config.buildSubdirectory[`dev`]
  },
  files: [config.buildDirectory + config.buildSubdirectory[`dev`] + '/**/*.html'],
  port:config.localport
}
