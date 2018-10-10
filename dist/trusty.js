"use strict";
exports.__esModule = true;
require("colors");
var cli_1 = require("cli");
var levelup = require("levelup");
var leveldown = require("leveldown");
var save_1 = require("./services/save");
var use_1 = require("./services/use");
var list_1 = require("./services/list");
var config_1 = require("./config");
function start() {
    var options = cli_1.parse(config_1.optionsObj, null);
    var _dbPath = options['database'];
    var db = levelup(leveldown(_dbPath));
    if (options['list']) {
        list_1.list(db);
    }
    else if (options['inspect']) {
        list_1.inspect(options['inspect'], db);
    }
    else if (options['purge']) {
        list_1.purge(db);
    }
    else if ((options['save'] || options['use']) && options['dir']) {
        if (options['save']) {
            save_1.save(options, db);
        }
        else if (options['use']) {
            use_1.use(options, db);
        }
    }
    else {
        console.log("You need to specify a directory when using the --save or --use flag".red);
    }
}
exports.start = start;
if (process.env['LOADED_MOCHA_OPTS'] != 'true') {
    start();
}
