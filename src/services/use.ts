import 'colors';
import * as fs from 'fs-extra';
import { join, extname } from 'path';

import { cwd, rootDir } from '../config';

declare var process;

export function use(options, db) {
    db.get(options['use'])
    .then(dir => {
        let fstat;
        try {
            fstat = fs.lstatSync(dir.toString());
        } catch {
            console.log(`\nSeems like that file or folder doesn't exist...\nIf this is happening, I suggest reinstalling trusty or using the purge command...\n`.red);
            process.exit();
        }

        let type = 'directory';
        if (fstat.isFile()) type = 'file';

        const newDir = getDir(options['dir']);
        const formattedName = `${options['use']}${extname(dir.toString())}`;

        console.log(`\nPreparing to use ${type} template ${options['use']} in\n\t${newDir}\n`.green);

        const outputDir = getOutputDir(newDir, formattedName);
        console.log(`The output will go to\n\t${outputDir}\n`.green);

        fs.copySync(dir.toString(), outputDir);
        console.log(`✓ Successfully created template ${type} ${options['use']}\n`.green);
    });
}

function getDir(dir) {
    return join(cwd, dir);
}

function getOutputDir(dir, formattedName) {
    return join(dir, formattedName)
}