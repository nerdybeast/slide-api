import PouchDB = require('pouchdb');
import fs = require('fs-extra');
import path = require('path');
import { findById, update } from './plugins';
import Debug from '../Debug';

let debug = new Debug('database');
let appSettingsDir = process.env.SLIDE_APP_SETTINGS_DIR || path.join(__dirname, '../../../temp');

PouchDB.plugin(require('pouchdb-find'));
PouchDB.plugin({ findById, update });

fs.ensureDirSync(appSettingsDir);

let fullDbPath = path.join(appSettingsDir, '.slide-db');
debug.info(`DB will be create at => ${fullDbPath}`);

let db = new PouchDB(fullDbPath);
db.on('created', (dbInfo) => debug.info(`${dbInfo.name} created`));

let changes = db.changes({
	live: true,
	since: 'now',
	include_docs: true
});

changes.on('change', (change) => debug.info(`db change result`, change));

changes.on('error', (err) => {
	
	// let ex = new Error(err.message);
	// ex = convertRollbarError(ex, err);

	// rollbar.exception(ex, {}, () => {
	// 	debug(`db change err => %o`, err);
	// });
	debug.error('db change error', err);
});

export default db;