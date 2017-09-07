import * as jsforce from 'jsforce';
import { DescribeMetadataResult } from '../models/DescribeMetadataResult';
import { MetadataObject } from '../models/MetadataObject';
import { ListMetadataQuery } from '../interfaces/ListMetadataQuery';
import Debug from './Debug';
import { ServiceError } from './ServiceError';
import { capitalize } from '../utilities';

const debug = new Debug('Salesforce.ts');

export class Salesforce {

	protected conn: any;

	constructor(private org) {

		this.conn = new jsforce.Connection({
			instanceUrl: org.urls.instance,
			accessToken: org.accessToken,
			version: org.version
		});

	}

	async orgGlobalMetadataDescribe() : Promise<DescribeMetadataResult> {
		
		try {
		
			let metadata = <DescribeMetadataResult>(await this.conn.metadata.describe());
			
			let names = metadata.metadataObjects.map(x => x.xmlName);
			debug.verbose(`metadata objects`, names.join(', '));

			return metadata;

		} catch (error) {
			debug.error(`an error occured calling conn.metadata.describe()`, error);
			this.throwServiceError(error);
		}
		
	}

	async getMetadataList(query: ListMetadataQuery[]) : Promise<MetadataObject[]> {

		debug.info(`getMetadataList() query`, query);

		try {
			
			let result = <MetadataObject[]>(await this.conn.metadata.list(query));

			if(!result) {
				
				//Will be true if the call to list() returns no results.
				result = [];

			} else if(!Array.isArray(result)) {

				//The result of this.conn.metadata.list(query) will be a single object if only 1 result is found.
				result = [result];
			}

			let names = result.map(x => x.fileName);
			debug.verbose(`metadata list query for: ${query.map(x => x.type).join(', ')}`);

			return result;

		} catch (error) {
			debug.error(`an error occured calling conn.metadata.list()`, error);
			this.throwServiceError(error);
		}
	}

	throwServiceError(sfError: any, statusCode: number = 400) {
		sfError.name = this.parseErrorName(sfError.name);
		let serviceError = new ServiceError(statusCode, sfError.errorCode);
		serviceError.add(sfError);
		throw serviceError;
	}

	parseErrorName(errorName: string) {

		const toLookFor = 'sf:';

		if(!errorName.startsWith(toLookFor)) return errorName;

		errorName = errorName.replace('sf:', '');
		let parts = errorName.split('_').map(x => capitalize(x));
		return parts.join(' ');
	}
}