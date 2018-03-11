var gulp = require('gulp');
var sequence = require('run-sequence');
var path = require('path');
var exec = require('child_process').execSync;
var $ = require('gulp-load-plugins')({ lazy: true });
var tools = require('./tools.js');
var config = require('./gulp.config')();
var argv = require('yargs').argv;

var hugoConfigFile = 'config-dev.yaml';

// Arguments
if (argv.dist) {
    tools.log('BUILD is DIST!');
    hugoConfigFile = 'config-dist.yaml';   
}

// Build

gulp.task('build', function () {
    tools.log('Build started.');
    sequence('clean', 
             'build-styles',
             'build-scripts',
             'build-images', 
             'build-hugo',
             'build-dependencies',
             function() { tools.log('Build done.'); }
    );
});

// Delete build folder

gulp.task('clean', function () {
    tools.delete(config.path.build.folders.root);
});

// Process styles

gulp.task('build-styles', function () {
    return gulp
        .src(config.path.src.files.sass)
        .pipe($.plumber( {errorHandler: tools.reportError} ))
        .pipe($.sass())
        .pipe($.autoprefixer({ browsers: ['last 2 version', '> 2%'] }))
        .pipe(gulp.dest(config.path.build.folders.styles));
});

// Process scripts

gulp.task('build-scripts', function () {
    return gulp
        .src(config.path.src.files.scripts)
        .pipe($.plumber( {errorHandler: tools.reportError} ))
        .pipe(gulp.dest(config.path.build.folders.scripts));
});


// Process images 

gulp.task('build-images', function () {
    return gulp
        .src(config.path.src.files.images)
        .pipe($.plumber( {errorHandler: tools.reportError} ))
        .pipe(gulp.dest(config.path.build.folders.images));
});

// Generate HTML with Hugo

gulp.task('build-hugo', function() {
    var src = path.join(process.cwd(), config.path.src.folders.hugo);
    var dst = path.join(process.cwd(), config.path.build.folders.root);
    var configFile = src + '/' + hugoConfigFile;
    var cmd = 'hugo --config="' + configFile + '" -s "' + src + '" -d "' + dst + '"';
    var result = exec(cmd, {encoding: 'utf-8'});
});

// Finish processing

gulp.task('build-dependencies', function () {
    var wiredep = require('wiredep').stream;
    var options = {
        bowerJson: require(config.path.tools.bower.file),
        directory: config.path.tools.bower.components,
        ignorePath: '../..'
    };

    return gulp
        .src(config.path.build.files.html)
        .pipe($.plumber( {errorHandler: tools.reportError} ))
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.path.build.files.scripts)))
        .pipe($.inject(gulp.src(config.path.build.files.styles)))
        .pipe(gulp.dest(config.path.build.folders.root));        
});