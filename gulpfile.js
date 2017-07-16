'use strict';

var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass   = require('gulp-sass'),
    maps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');

// css autoprefixer plugin config
var autoprefixerOptions = {
    browsers: ['last 2 versions']
};


// file locations
var cssSource = './client/scss';
var cssOutputDir = './public/css';
var jsSource = './client/src';
var jsOutputDir = './public/js';


/**
 * Task: compile scss.
 * generate: styles.css, styles.min.css, maps/styles.css.map
 */
gulp.task('sass', function() {
    return gulp.src(cssSource + '/styles.scss')
        .pipe(maps.init())  // Initialize source map for compressed css
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(cssOutputDir))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(maps.write('maps'))
        .pipe(gulp.dest(cssOutputDir));
});


/**
 * watcher: watch scss file source, execute 'sass' task on change
 */
gulp.task('sass:watch', function () {
    gulp.watch(cssSource + '/**/*.scss', ['sass']);
});


/**
 * Task: concatenate and compress js files
 * generate: scripts.js scripts.min.js
 */
gulp.task('script', function () {
    var jsFiles = [
        jsSource + '/main.js',
        jsSource + '/socket.js'

    ];

    return gulp.src(jsFiles)
        .pipe(maps.init())  // Initialize source map for compressed css
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsOutputDir))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(maps.write('maps'))
        .pipe(gulp.dest(jsOutputDir));
});


/**
 * watcher: js source, execute 'scripts' task on change
 */
gulp.task('js:watch', function () {
    gulp.watch(jsSource + '/**/*.js', ['script']);
});


/**
 * task: just copy files, from client source to public destination
 * files, those are not supposed to get combined and minified
 * Warning: do not repeat files in both tasks.
 */
gulp.task('js:justCopy', function () {
    var jsFiles = [
        //jsSource + 'someJSFile.js'
    ];
    gulp.src(jsFiles)
        .pipe(gulp.dest('./public/js'));
});


/**
 * task: copy vendor(third-party) js files.
 * just copy them from source to public destination
 */
gulp.task('js:copyVendor', function() {
    var vendorSrc = './client/vendor';
    var jsFiles = [
        vendorSrc + '/jquery-3.2.1.min.js'
    ];
    gulp.src(jsFiles)
        .pipe(gulp.dest('./public/js'));
});


/**
 * task: copy assets.
 * image, sound, any other static file
 */
gulp.task('copy:assets', function(){
    var assetsSrc = './client/assets/**';
    gulp.src(assetsSrc)
        .pipe(gulp.dest('./public/assets/'));
});


/**
 * gulp default task
 */
gulp.task('default', ['copy:assets', 'js:justCopy', 'js:copyVendor', 'sass', 'script',
                      'sass:watch', 'js:watch']);
