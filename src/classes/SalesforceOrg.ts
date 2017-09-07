import db from './Database';
import { ServiceError } from './ServiceError';

export class SalesforceOrg {

	async saveNew(org) {

		org._id = org._id || org.organization_id;

		let existingOrg = await db.findById(org._id);

		if(existingOrg) {
			return db.update(org);
		}

		return db.put(org).then(() => db.get(org._id));
	}

	saveVersions(orgId: string, versions) {
		
		versions.forEach(version => version.orgId = orgId);
		
		return db.find({
			selector: { orgId }
		}).then(result => result.docs);
	}

	async findAll() {
		
		let result = await db.find({
			selector: { type: 'org' }
		});

		return result.docs || [];

		// return db.find({
		// 	selector: { type: 'org' }
		// }).then(result => result.docs);
	}

	async getById(orgId: string) {
		let org = await db.findById(orgId);
		if(!org) throw new ServiceError(404, 'INVALID_ORG_ID', 'Invalid Org Id', `No org found with id "${orgId}"`);
		return org;
	}

}
