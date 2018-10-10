"use strict";
exports.__esModule = true;
require("colors");
var fs = require("fs-extra");
var path_1 = require("path");
var config_1 = require("../config");
function save(options, db) {
    var dir = options['dir'];
    if (dir.length > 2) {
        if (dir[0] === "." && dir[1] === "/") {
            dir = path_1.join(config_1.cwd, dir);
        }
    }
    else {
        dir = config_1.cwd;
    }
    var fstat;
    try {
        fstat = fs.lstatSync(dir);
    }
    catch (_a) {
        console.log("\nSeems like that file or folder doesn't exist...\n".red);
        process.exit();
    }
    var type = 'directory';
    if (fstat.isFile())
        type = 'file';
    console.log(("\nPreparing to save " + type + " template\n\t" + dir + "\n").green);
    var newDir = prependUnix(dir);
    console.log(("Saving template " + options['save'] + " to\n\t" + newDir + "\n").green);
    fs.copySync(dir, newDir);
    db.put(options['save'], newDir)
        .then(function (done) {
        console.log(("\u2713 Successfully saved " + type + " to template " + options['save'] + "\n").green);
    });
}
exports.save = save;
function prependUnix(dir) {
    var originalName = path_1.basename(dir);
    var newFilename = Number(new Date()) + "-" + originalName;
    return path_1.join(config_1.rootDir, '.trustyfs', newFilename);
}
