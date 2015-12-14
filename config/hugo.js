var html =  Config.htmlDirectory + Config.htmlGenerator ;
var contentdir = Config.contentDirectory + Config.htmlGenerator;

debug('md content directory: ', contentdir)

// TODO need to open up for readwrite the config.toml file and write out the contentdir setting with "content" variable.

module.exports = {
  layouts: html,
  configPath : contentdir + '/config.toml',
  pages: contentdir + '/pages',
  data:  contentdir + '/data',
  watch: [html + '/**/*.*',contentdir + '/**/*.*']
  }
