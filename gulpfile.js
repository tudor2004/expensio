var gulp 			= require('gulp'),
	concat      	= require('gulp-concat'),
	mainBowerFiles 	= require('main-bower-files'),
	uglify     		= require('gulp-uglifyjs'),
	minifyCSS 		= require('gulp-minify-css'),
	filter 			= require('gulp-filter')
	livereload 		= require('gulp-livereload');

var config = {
	scripts: {
		src: './src/app/**/*.js'
	},
	styles: {
		src: './src/assets/css/**/*.css'
	},
	html: {
		src: './src/**/*.html'
	}
}


// JS
gulp.task('scripts', function() {
    return gulp.src(config.scripts.src)
    	.pipe(concat('scripts.js'))
    	.pipe(gulp.dest('./dist'))
    	.pipe(gulp.dest('./src/bundle'))
    	.pipe(livereload());
});

// CSS
gulp.task('styles', function() {
  return gulp.src(config.styles.src)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./src/bundle'))
    .pipe(livereload());
});

// VENDOR
gulp.task('vendor', function() {
  var jsFilter = filter('*.js', {restore: true}),
      cssFilter = filter('*.css');

  return gulp.src(mainBowerFiles())
    .pipe(jsFilter)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./src/bundle'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(concat('vendor.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./src/bundle'))
    .pipe(livereload());
});

// HTML
gulp.task('html', function() {
	return gulp.src([
		'./index.html'
	])
	.pipe(livereload());
});

gulp.task('build', ['scripts', 'styles', 'vendor']);


gulp.task('watch', function() {
	livereload.listen();

	gulp.watch(config.html.src, ['html']);
	gulp.watch(config.scripts.src, ['scripts']);
	gulp.watch(config.styles.src, ['styles']);
});