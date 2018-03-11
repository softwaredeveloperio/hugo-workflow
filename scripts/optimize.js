var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });
var sequence = require('run-sequence');
var tools = require('./tools.js');
var config = require('./gulp.config')();

var errorCounter = 0;

gulp.task('optimize', function () {
    sequence('optimize-assets', 
        'optimize-images',
        'optimize-clean',
        function() { tools.log('Optimize done.'); }
    );
});

gulp.task('optimize-assets', function () {

    return gulp
        .src(config.path.build.files.html)
        .pipe($.plumber( {errorHandler: tools.reportError} ))
        .pipe($.useref())
        .pipe($.if('*.css', $.csso()))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.html', ($.htmlmin({ collapseWhitespace: true, removeComments: true }))))
        .pipe(gulp.dest(config.path.build.folders.root));
});

gulp.task('optimize-images', function() {
    return gulp
        .src('./build/**/*')
        .pipe($.plumber( {errorHandler: tools.reportError} ))
        .pipe($.imagemin())
        .pipe(gulp.dest('./build'));
});

gulp.task('optimize-clean', function() {
    tools.delete(config.path.build.filters.allJSExceptMinified);
    tools.delete(config.path.build.filters.allCSSExceptMinified);
});

