var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:development', function(cb) {
// gulpSequence(['sass', 'html'], ['watch', 'browserSync'], cb);
gulpSequence(['sass', 'html'], ['watch'], cb);
});
