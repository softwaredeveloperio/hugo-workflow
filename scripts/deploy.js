var gulp = require('gulp');
var tools = require('./tools.js');
var config = require('./gulp.config')();

var config = {
    accessKeyId: "yourAccessKeyId",
    secretAccessKey: "yourSecretAccessKey",
    region: 'yourRegionOfChoice'
};

var s3 = require('gulp-s3-upload')(config);

gulp.task('deploy', ['pre-deploy'], function () {

    tools.log('Deploying site to Amazon S3.');

    return gulp.src("./build/**")
        .pipe(s3({ Bucket: 'yourBucket', ACL: 'public-read' }, { maxRetries: 5 }));

});

gulp.task('pre-deploy', function() {
    clean(['./build/**/*.js', '!./build/**/*.min.js']);
    clean(['./build/**/*.css', '!./build/**/*.min.css']);
});