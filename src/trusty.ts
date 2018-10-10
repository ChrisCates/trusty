import 'colors';
import { parse } from 'cli';

import * as levelup from 'levelup';
import * as leveldown from 'leveldown';

import { save } from './services/save';
import { use } from './services/use';
import { list, inspect, purge } from './services/list';

import { optionsObj } from './config';

declare const process;

export function start() {
    const options = parse(optionsObj, null);

    const _dbPath = options['database'];
    const db = levelup(leveldown(_dbPath));

    if (options['list']) {
        list(db);
    } else if (options['inspect']) {
        inspect(options['inspect'], db);
    } else if (options['purge']) {
        purge(db);
    } else if ((options['save'] || options['use']) && options['dir']) {
        if (options['save']) {
            save(options, db);
        } else if (options['use']) {
            use(options, db);
        }
    } else {
        console.log(`You need to specify a directory when using the --save or --use flag`.red)
    }
}

if (process.env['LOADED_MOCHA_OPTS'] != 'true') {
    start();
}
