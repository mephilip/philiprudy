var pkg = require('./package.json'),
	fs = require('fs'),
	gulp = require('gulp'),
	browserify = require('browserify'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),
	cmq = require('gulp-combine-media-queries'),
	autoprefixer = require('gulp-autoprefixer'),
	cssmin = require('gulp-cssmin'),
	replace = require('gulp-replace'),
	path = require('path'),
	rename = require('gulp-rename'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
    babel = require('gulp-babel'),
    browsersync = require('browser-sync'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    filter = require('gulp-filter'),
    newer = require('gulp-newer'),
    plumber = require('gulp-plumber'),
    reload = browsersync.reload,
	sourcemaps = require('gulp-sourcemaps');

var onError = function(err) {
    notify.onError({
        title:    "Error",
        message:  "<%= error %>",
    })(err);
    this.emit('end');
};

var plumberOptions = {
    errorHandler: onError,
};

var jsFiles = {
    vendor: [

    ],
    source: [
        'assets/js/src/components/posts.jsx'
    ]
};

var sassSrc = __dirname + '/assets/scss/*.scss';
var output = 'build/css';

function echo() {
	console.log(sassSrc);
	console.log(output);
}

gulp.task('echo', echo);
function doSass (cb) {
	gulp.src(sassSrc)
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: true,
			soureMap: 'src/scss',
			sourceComments: 'map'
		}).on('error', sass.logError))
		.pipe(cmq())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(output))
		.pipe(cssmin())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest(output))
		.on('end', function () {
			if (cb && typeof cb === 'function')
				cb();
		});
}
gulp.task('sass',doSass);


///////////////////////
// watch
///////////////////////

function doWatch (cb) {
	gulp.watch('./src/scss/**/*.scss', ['sass']);
	if (cb && typeof cb === 'function')
		cb();
}
gulp.task('watch', doWatch);

///////////////////////
// concats
///////////////////////


function doCopyReact() {
    return gulp.src('node_modules/react/dist/react.js')
        .pipe(newer('assets/js/src/vendor/react.js'))
        .pipe(gulp.dest('assets/js/src/vendor'));
}

gulp.task('copy-react', doCopyReact);

function doCopyReactDom() {
    return gulp.src('node_modules/react-dom/dist/react-dom.js')
        .pipe(newer('assets/js/src/vendor/react-dom.js'))
        .pipe(gulp.dest('assets/js/src/vendor'));
}

gulp.task('copy-react-dom', doCopyReactDom);

function doCopyJsVendor() {
    return gulp
        .src([
            './assets/js/src/vendor/react.js',
            './assets/js/src/vendor/react-dom.js'
        ])
        .pipe(gulp.dest('assets/js'));
}

gulp.task('copy-js-vendor', doCopyJsVendor);

function doConcat() {
    return gulp.src(jsFiles.vendor.concat(jsFiles.source))
        .pipe(sourcemaps.init())
        .pipe(babel({
            only: [
                'assets/js/src/components',
            ],
            compact: false
        }))
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/js'));
}

gulp.task('concat', ['copy-react', 'copy-react-dom'], doConcat);

