import express = require('express');
import serializer from '../serializer';
import { Org } from '../classes/Org';
import db from '../classes/Database';
import urlVersionInjection from '../classes/helpers/url-version-injection';
import { Metadata } from "../classes/Metadata";

let router = express.Router();

router.get('/', (req, res) => {

	let org = new Org();

	org.findAll().then(orgs => {
		orgs.forEach(org => org.urls = urlVersionInjection('v40.0', org.urls));
		const result = serializer.serialize('org', orgs);
		return res.json(result);
	});

});

router.get('/:id', (req, res) => {

	db.findById(req.params.id).then(org => {
		return res.json(serializer.serialize('org', org));
	});

});

router.get('/:id/availablesubscription', (req, res) => {

	db.findById(req.params.id).then(async org => {
		
		let metadata = new Metadata(org);
		let availableMetadata = await metadata.availableMetadataWithChildRecords();
		const result = serializer.serialize('metadata', availableMetadata);

		return res.json(result);
	});

});

export default router;