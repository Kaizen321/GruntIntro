//include gulp
var gulp = require('gulp');


// include plug-ins
var jsHinter = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');

var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// JS hint task
gulp.task('jshint', function () {
	gulp.src('./src/scripts/*.js')
		.pipe(jsHinter())
		.pipe(jsHinter.reporter('default'));
});

//minify new images
gulp.task('imagemin', function () {
	var imgSrc = './src/images/**/*',
		imgDst = './build/images';

	gulp.src(imgSrc)
		.pipe(changed(imgDst))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst));
});

//minify new or changed HTML changes
gulp.task('htmlpage', function() {
	var htmlSrc = './src/*.html',
		htmlDst = './build';
		
	gulp.src(htmlSrc)
		.pipe(changed(htmlDst))
		.pipe(minifyHTML())
		.pipe(gulp.dest(htmlDst));	
});

//JS concat, strip debugging and minify
gulp.task('scripts', function() {
	gulp.src(['.src/scripts/lib.js', './src/scripts/*.js'])
		.pipe(concat('script.js'))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(gulp.dest('./build/scripts/'));	
});

// CSS concat, auto-prefix adn minify
gulp.task('styles', function() {
	gulp.src(['./src/styles/*.css'])
		.pipe(concat('styles.css'))
		.pipe(autoprefix('last 2 versions'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./build/styles/'));
});

// default gulp task
gulp.task('default', function() {
	var client = ['imagemin','htmlpage', 'scripts', 'styles'];
	
	gulp.watch('./src/*.html', client);
	gulp.watch('./src/scripts/*.js', client);
	gulp.watch('./src/styles/*.css', client);

});