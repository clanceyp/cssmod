var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	combineMq = require('gulp-combine-mq'),
	plumber = require('gulp-plumber'),
	print = require('gulp-print'),
	reload = browserSync.reload,
	sass = require('gulp-sass'),
	$ = require('gulp-load-plugins')();

// Define paths
var paths = {
	srcJS : './src/scripts/' ,
	distJS: './build/scripts/',
	srcCSS : './src/sass/' ,
	distCSS: './build/css/'
};

var browsersTable = [
	'chrome >= 40',
	'firefox >= 30',
	'safari >= 7',
	'ie >= 9',
	'ios_saf >= 6',
	'and_chr >= 40',
	'and_uc >= 4'
];

// Convenience handler for error-level errors.
function onError(error) { handleError.call(this, 'error', error);}
// Convenience handler for warning-level errors.
function onWarning(error) { handleError.call(this, 'warning', error);}


gulp.task('styles', function(cb) {
	console.log('[gulp] Compiling sass: ');
	return gulp
		.src(paths.srcCSS + '*.scss')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sass())
		.pipe(autoprefixer({browsers: browsersTable}))
		.pipe(combineMq({
			beautify: true
		}))
		.pipe(gulp.dest(paths.distCSS))
		.pipe(reload({stream:true}))
		.pipe(print(function(filepath) {
			return "CSS generated: " + filepath;
		}));
});

gulp.task('scripts', function () {
	return gulp.src(paths.srcJS + '*.js')
		.pipe($.plumber({
		  errorHandler: $.notify.onError("Error: <%= error.message %>")
		}))
		.pipe($.sourcemaps.init())
		.pipe($.babel())
		.pipe($.concat('main.min.js'))
		.pipe($.uglify())
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest(paths.distJS))
		.pipe(reload({stream:true}));
});	

gulp.task('watch', function() {
	gulp.watch(paths.srcJS + '**/*.js', ['scripts']);
	gulp.watch(paths.srcCSS + '**/*.scss', ['styles']);
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: './build'
		}
	})
});


gulp.task('default', ['styles','scripts','browser-sync','watch']);