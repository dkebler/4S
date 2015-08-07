var config = require('./')

module.exports = {
  watch: config.sourceDirectory + '/' + config.htmlGenerator + '/**/*.*',
  src: config.sourceDirectory + '/' + config.htmlGenerator + '/',
  dest: '../../' + config.publicDirectory
  }