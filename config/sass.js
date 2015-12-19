// generate list of paths to bower sass/scss libraries



var sass = {};
// TODO improve the handling of this.  If sass-bower.json doesn't exist then run sass-bower.js
var sass = require('.' + Config.configDirectory + 'sass-bower'); // json file of paths
if (typeof sass.paths === 'undefined') {console.log('sass/scss bower paths NOT retrieved, run "gulp bowersass"');}
if (sass.paths === null) {console.log('no sass/scss bower paths available');}

module.exports = {
  autoprefixer: { browsers: ['last 2 version'] },
  src: Config.assetsDirectory + "styles/sass/site.scss",
  watch: Config.assetsDirectory + "styles/sass/" + '**/*.*',
  dest: 'assets/styles/',
  paths: sass.paths
}
