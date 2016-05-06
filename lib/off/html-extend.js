gulp.task('html:extend',['html:merge'], function() {

	gulp.src('assets/html/base/*.ehtml')
    .pipe( posthtml([require('posthtml-extend')({'root':'assets/html/base'})]) )
//	.pipe(nunjucks({ path: ['assets/html/base'] // String or Array }))
    .on('error', Info)
    .pipe( rename({extname: ".html"}) )
		// .pipe(gulp.dest('assets/html/hugo/layouts/_default/'));
    .pipe(gulp.dest('assets/html/hugo/layouts/_default/'));
});
