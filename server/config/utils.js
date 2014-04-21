'use strict';

var fs = require('fs'),
    path = require('path');

exports.walker = function(initWalkPath, excludeDir, cb) {
    if (typeof(excludeDir) === 'string') {
        excludeDir = [excludeDir];
    }
    var callback = cb;
    return function() {
        var argList = Array.prototype.slice.call(arguments);
        function walkDir(walkPath) {
            var files = fs.readdirSync(walkPath).forEach(function(file) {
                var newPath = path.join(walkPath, file);
                var stats = fs.statSync(newPath);
                if (stats.isDirectory() && excludeDir.indexOf(file) === -1) { 
                    walkDir(newPath); 
                } else if (stats.isFile() && (/(.*)\.(js|coffee)$/.test(file))) {
                    callback.apply(this, [newPath].concat(argList));
                }
            });
        }
        walkDir(initWalkPath);
    };
};