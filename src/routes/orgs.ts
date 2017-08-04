import express = require('express');
import serializer from '../serializer';
import { Org } from '../classes/Org';
import urlVersionInjection from '../classes/helpers/url-version-injection';

let router = express.Router();

router.get('/', (req, res) => {

	let org = new Org();

	org.findAll().then(orgs => {
		orgs.forEach(org => org.urls = urlVersionInjection('v40.0', org.urls));
		const result = serializer.serialize('org', orgs);
		return res.json(result);
	});

});

export default router;