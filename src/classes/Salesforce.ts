import * as jsforce from 'jsforce';
import { GlobalMetadataDescription } from '../models/GlobalMetadataDescription';

export class Salesforce {

	protected conn: any;

	constructor(private org) {

		this.conn = new jsforce.Connection({
			instanceUrl: org.urls.instance,
			accessToken: org.accessToken,
			version: org.version
		});

	}

	async orgGlobalMetadataDescribe() : Promise<GlobalMetadataDescription> {
		return await this.conn.metadata.describe();
	}
}