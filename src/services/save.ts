import 'colors';
import * as fs from 'fs-extra';
import { join, basename } from 'path';

import { cwd, rootDir } from '../config';

declare var process;

export function save(options, db) {
    let dir = options['dir'];

    if (dir.length > 2) {
        if (dir[0] === "." && dir[1] === "/") {
            dir = join(cwd, dir);
        }
    } else {
        dir = cwd;
    }

    let fstat;
    try {
        fstat = fs.lstatSync(dir);
    } catch {
        console.log(`\nSeems like that file or folder doesn't exist...\n`.red);
        process.exit();
    }

    let type = 'directory';
    if (fstat.isFile()) type = 'file';

    console.log(`\nPreparing to save ${type} template\n\t${dir}\n`.green);

    const newDir = prependUnix(dir);

    console.log(`Saving template ${options['save']} to\n\t${newDir}\n`.green);
    fs.copySync(dir, newDir);

    db.put(options['save'], newDir)
    .then(done => {
        console.log(`✓ Successfully saved ${type} to template ${options['save']}\n`.green);
    });   
}

function prependUnix(dir) {
    const originalName = basename(dir);
    const newFilename = `${Number(new Date())}-${originalName}`;

    return join(rootDir, '.trustyfs', newFilename);
}