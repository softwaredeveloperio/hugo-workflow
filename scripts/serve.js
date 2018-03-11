var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({ lazy: true });
var sequence = require('run-sequence');
var tools = require('./tools');
var config = require('./gulp.config')();

gulp.task('serve', function () {

    // Gulp watch

    gulp.watch([config.path.src.files.sass], ['build-styles']);
    gulp.watch([config.path.src.files.scripts], ['build-scripts']);
    gulp.watch([config.path.src.files.markdown], ['build-hugo', 'build-dependencies']);
    gulp.watch([config.path.src.files.html], ['build-hugo', 'build-dependencies']);

    // Nodemon

    var nodemonOptions = {
        script: config.path.server.script,
        delayTime: config.path.server.delayTime,
        env: {
            'PORT': config.path.server.port,
            'NODE_ENV': 'development'
        },
        watch: [config.path.server.watch]
    };

    $.nodemon(nodemonOptions)
    .on('start', function () {
        startBrowserSync();
    })
    .on('restart', function (event) {
        tools.log('Files changed, restarting server ' + event);
        setTimeout(function () {
            browserSync.notify('Reloading browser.');
            browserSync.reload({ stream: false });
        }, 1000);

    });
});

function startBrowserSync() {
    
    if (args.nosync || browserSync.active) {
        return;
    }

    var options = {
        proxy: config.path.server.browserSync.proxy,
        port: config.path.server.browserSync.port,
        files: config.path.build.files.watch,
        ghostMode: {
            clicks: config.path.server.browserSync.ghostMode.clicks,
            location: config.path.server.browserSync.ghostMode.location,
            forms: config.path.server.browserSync.ghostMode.forms,
            scroll: config.path.server.browserSync.ghostMode.scroll
        },
        injectChanges: config.path.server.browserSync.injectChanges,
        logFileChanges: config.path.server.browserSync.logFilesChanges,
        logLevel: config.path.server.browserSync.logLevel,
        logPrefix: config.path.server.browserSync.logPrefix,
        notify: config.path.server.browserSync.notify,
        reloadDelay: config.path.server.browserSync.reloadDelay
    };

    browserSync(options);
}