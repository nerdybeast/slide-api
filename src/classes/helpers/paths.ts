import path = require('path');
import os = require('os');
import Debug from '../Debug';

let homedir = os.homedir();
let debug = new Debug('paths');

const packageJson = require(path.join(__dirname, '../../../package.json'));
debug.info('package.json path', packageJson);

function getAppSettingsPath(platform) {
	switch(platform) {
		case 'win32': return path.join(homedir, 'AppData', 'Roaming', packageJson.name);
		case 'darwin': return path.join(homedir, 'Library', 'Preferences', packageJson.name);
		default: return path.join(homedir, `.${packageJson.name}`);
	}
}

let appSettingsPath = getAppSettingsPath(os.platform());
debug.info('app settings path', appSettingsPath);

export default appSettingsPath;