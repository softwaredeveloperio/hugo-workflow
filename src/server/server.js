/*jshint node:true*/
'use strict';

var express = require('express');
var path = require('path');
var tools = require('../../scripts/tools');
var config = require('../../scripts/gulp.config')();

var app = express();
var rootPath = path.normalize(__dirname);
var port = process.env.PORT || config.path.server.port;
var environment = process.env.NODE_ENV;

tools.log('Starting node server on port ' + port + ' and enviroment ' + environment.toUpperCase() + '.');

// Ping
app.get('/ping', function(req, res, next) {
    tools.log(req.body);
    res.send('pong from ' + environment);
});

// Serve files
app.use(express.static(config.path.build.folders.root));
app.use(express.static('./'));

app.listen(port, function() {
    tools.log('Expresss server listening on port ' + port);
});