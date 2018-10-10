"use strict";
exports.__esModule = true;
require("colors");
var fs = require("fs-extra");
var klaw = require("klaw-sync");
var path_1 = require("path");
var config_1 = require("../config");
function list(db) {
    console.log("\nList of available templates:\n".green);
    db.createReadStream()
        .on('data', function (data) {
        var fstat = fs.lstatSync(data.value);
        var type = 'directory';
        if (fstat.isFile())
            type = 'file';
        console.log(("\t" + data.key + "\t\t" + type).blue);
    })
        .on('error', function (error) {
        console.log(("ERROR: " + error).red);
    })
        .on('end', function (done) {
        console.log("\nTo inspect a template directory use --inspect [name]\n".green);
    });
}
exports.list = list;
function inspect(name, db) {
    db.get(name)
        .then(function (dir) {
        var fstat = fs.lstatSync(dir.toString());
        var type = 'directory';
        if (fstat.isFile())
            type = 'file';
        if (type === 'file') {
            console.log("\n\tLooks like this template is only a file, so nothing to inspect...\n".green);
        }
        else {
            console.log(("\nInspecting folder structure for " + name + ":\n").green);
            var dirs = klaw(dir.toString(), { nofile: true });
            dirs.unshift({ path: dir.toString() });
            for (var i = 0; i < dirs.length; i++) {
                var path = dirs[i]['path'];
                var da = path.split('/');
                var directory = i === 0 ? name + "/" : da[da.length - 1] + "/";
                var prependedTabs = "--";
                for (var ii = 0; ii < i; ii++) {
                    prependedTabs += "--";
                }
                console.log(("" + prependedTabs + directory).blue.bold);
                var files = klaw(path, { nodir: true });
                for (var ii = 0; ii < files.length; ii++) {
                    var path_2 = files[ii]['path'];
                    var file = path_1.basename(path_2);
                    console.log((prependedTabs + "-" + file).blue);
                }
            }
            console.log(("\n\u2713 Completed inspection of " + name + "\n").green);
        }
    });
}
exports.inspect = inspect;
function purge(db) {
    db.close()
        .then(function (done) {
        fs.removeSync(config_1.dbPath);
        fs.removeSync(path_1.join(config_1.rootDir, '.trustyfs'));
        console.log("\n\u2713 Successfully purged all Trusty templates\n".green);
    });
}
exports.purge = purge;
