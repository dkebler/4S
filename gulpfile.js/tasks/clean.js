var gulp = require('gulp');
var del = require('del');
var config = require('../config');
var htmlConfig = require('../config/html');
var iconFontConfig = require('../config/iconFont');

gulp.task('clean', function (cb) {
  del([
     config.publicDirectory
//    iconFontConfig.sassDest
  ], cb);
});
