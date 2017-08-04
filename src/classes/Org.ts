import db from './Database';

export class Org {

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

	findAll() {
		return db.find({
			selector: { type: 'org' }
		}).then(result => result.docs);
	}

}
