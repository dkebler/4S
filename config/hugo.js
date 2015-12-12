var config = require('./')

var html =  config.htmlDirectory + '/' + config.htmlGenerator ;
var content = config.contentDirectory + '/' + config.htmlGenerator;

// TODO need to open up the readwrite the config.toml file and write out the contentdir setting.

module.exports = {
  layouts: html,
  configPath : content + '/config.toml',	
  pages: content + '/pages',
  data:  content + '/data',
  watch: [html + '/**/*.*',content + '/**/*.*']
  }