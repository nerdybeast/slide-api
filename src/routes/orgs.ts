import express = require('express');
import serializer from '../serializer';
import { SalesforceOrg } from '../classes/SalesforceOrg';
import db from '../classes/Database';
import urlVersionInjection from '../classes/helpers/url-version-injection';
import { Metadata } from "../classes/Metadata";
import Debug from '../classes/Debug';

let debug = new Debug('orgs.ts');
let router = express.Router();

router.get('/', async (req, res) => {

	let salesforceOrg = new SalesforceOrg();
	let orgs = await salesforceOrg.findAll();

	orgs.forEach(org => org.urls = urlVersionInjection('v40.0', org.urls));
	const result = serializer.serialize('org', orgs);
	return res.json(result);

});

router.get('/:id', async (req, res) => {

	try {

		let salesforceOrg = new SalesforceOrg();
		let org = await salesforceOrg.getById(req.params.id);
		
		return res.json(serializer.serialize('org', org));

	} catch (error) {
		return res.status(error.statusCode).json({errors:[error]});
	}

});

router.get('/:id/availablesubscription', async (req, res) => {

	try {

		let salesforceOrg = new SalesforceOrg();
		let org = await salesforceOrg.getById(req.params.id);
		
		let metadata = new Metadata(org);
		let availableMetadata = await metadata.availableMetadataWithChildRecords();
		const result = serializer.serialize('metadata', availableMetadata);

		return res.json(result);

	} catch (error) {
		debug.error(`available subscription error`, error);
		return res.status(error.statusCode).json({errors:[error]});
	}

});

export default router;