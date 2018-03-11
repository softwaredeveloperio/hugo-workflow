var del = require('del');
var util = require('gulp-util');

module.exports = {

    delete: function(files) {
        del.sync(files);
    },
    
    log: function(message) {
        util.log(util.colors.green(message));
    },

    reportError: function(error) {

        errorCounter++;
        var lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';
    
        $.notify({
            title: 'Task Failed [' + error.plugin + ']',
            message: lineNumber + 'See console.',
            sound: 'Sosumi'
        }).write(error);
    
        $.util.beep();
    
        // Pretty error reporting
        var report = '';
        var chalk = $.util.colors.white.bgRed;
    
        report += chalk('ERR:') + ' ' + errorCounter+ '\n';
        report += chalk('TSK:') + ' [' + error.plugin + ']\n';
        report += chalk('DSC:') + ' ' + error.message + '\n';
        if (error.lineNumber) { report += chalk('LINE:') + ' ' + error.lineNumber + '\n'; }
        if (error.fileName)   { report += chalk('FILE:') + ' ' + error.fileName + '\n'; }
        console.error(report);
    
        // Prevent the 'watch' task from stopping
        this.emit('end');
    }

};