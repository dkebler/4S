var config = require('./')

module.exports = {
  server: {
    baseDir: config.publicDirectory,
  },
  files: ['public/**/*.html'],
  port:3033,
  browser: "firefox"
}
