var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ lazy: true });

gulp.task('vet', function() {

    return gulp
        .src(['/hugo/assets/scripts/**/*.js', './*.js'])
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}));
});
