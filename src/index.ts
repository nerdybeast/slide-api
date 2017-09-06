import path = require('path');
import express = require('express');
import cors = require('cors');
import bodyParser = require('body-parser');
import morgan = require('morgan');
import routes from './routes';
import appSettingsPath from './classes/helpers/paths';

export function api(appSettingsDir: string) {

	process.env.SLIDE_APP_SETTINGS_DIR = appSettingsDir;

	let app = express();

	app.disable('etag');

	app.use(morgan('dev'));
	app.use(cors());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(routes);

	app.listen(5090, () => console.log('express app listening on port 5090'));

	return app;
}

//Used during development, pass a "--start" command line argument to fire this function (this helps to avoid having to have another file that imports this function just to execute it)
if(process.argv.includes('--start')) {
	api(path.join(__dirname, '../temp'));
}