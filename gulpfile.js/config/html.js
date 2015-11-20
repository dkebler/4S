var config = require('./')

var content = './content';
var data = './data';

module.exports = {
  content: content,
  data:  data,
  watch: [config.sourceDirectory + '/' + config.htmlGenerator + '/**/*.*', content + '/**/*.*', data + '/**/*.*'],
  src: config.sourceDirectory + '/' + config.htmlGenerator + '/',
  dest: '../../' + config.publicDirectory
  }