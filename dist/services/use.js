"use strict";
exports.__esModule = true;
require("colors");
var fs = require("fs-extra");
var path_1 = require("path");
var config_1 = require("../config");
function use(options, db) {
    db.get(options['use'])
        .then(function (dir) {
        var fstat;
        try {
            fstat = fs.lstatSync(dir.toString());
        }
        catch (_a) {
            console.log("\nSeems like that file or folder doesn't exist...\nIf this is happening, I suggest reinstalling trusty or using the purge command...\n".red);
            process.exit();
        }
        var type = 'directory';
        if (fstat.isFile())
            type = 'file';
        var newDir = getDir(options['dir']);
        var formattedName = "" + options['use'] + path_1.extname(dir.toString());
        console.log(("\nPreparing to use " + type + " template " + options['use'] + " in\n\t" + newDir + "\n").green);
        var outputDir = getOutputDir(newDir, formattedName);
        console.log(("The output will go to\n\t" + outputDir + "\n").green);
        fs.copySync(dir.toString(), outputDir);
        console.log(("\u2713 Successfully created template " + type + " " + options['use'] + "\n").green);
    });
}
exports.use = use;
function getDir(dir) {
    return path_1.join(config_1.cwd, dir);
}
function getOutputDir(dir, formattedName) {
    return path_1.join(dir, formattedName);
}
