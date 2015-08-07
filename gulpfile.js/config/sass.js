var config = require('./')

module.exports = {
  autoprefixer: { browsers: ['last 2 version'] },
//  src: config.sourceAssets + "/stylesheets/**/*.{sass,scss}",
  src: config.sourceAssets + "/stylesheets/site.scss",
  watch: config.sourceAssets + "/stylesheets/" + '/**/*.*',
  dest: config.publicAssets + '/stylesheets',
  settings: {
//  indentedSyntax: true, // Enable .sass syntax!
//  imagePath: 'assets/images' // Used by the image-url helper
//  includePaths: scss_paths
  }
}