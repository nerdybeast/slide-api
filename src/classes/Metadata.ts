import { Salesforce } from './Salesforce';
import { MetadataObject } from '../models/MetadataObject';
import { MetadataTypeDescription } from "../models/MetadataTypeDescription";

export class Metadata extends Salesforce {

	constructor(org) {
		super(org);
	}

	/**
	 * Returns a list of Metadata objects with only a few properties containing a value (see MetadataObject constructor).
	 */
	async availableMetadata() : Promise<MetadataObject[]> {

		let globalMetadataDescription = await this.orgGlobalMetadataDescribe();
		
		//"metaFile" seems to be true for metadata types that actually have a downloadable file...
		return globalMetadataDescription.metadataObjects.filter(x => x.metaFile === true).map(x => new MetadataObject(x));
	}

	async metadataListByTypes(metadataObjects: MetadataObject[]) : Promise<MetadataObject[]> {
		
		//sf:LIMIT_EXCEEDED: LIMIT_EXCEEDED: No more than 3 allowed in request
		// let typesOptions = types.map(type => {
		// 	return { type };
		// });
		
		// return this.conn.metadata.list(typesOptions);

		let metadataListPromises = metadataObjects.map(x => this.conn.metadata.list({ type: x.type }));
		let metadataLists = await Promise.all(metadataListPromises);

		let result: MetadataObject[] = [];

		metadataLists.forEach(list => {
			
			if(list) {
				
				if(Array.isArray(list)) {
					
					(<MetadataObject[]>list).forEach(x => {
						result.push(combineMetadataObjects(metadataObjects, x));
					});


				} else {
					result.push(combineMetadataObjects(metadataObjects, list));
				}
			}
		});

		return result;
	}

	async availableMetadataWithChildRecords() : Promise<MetadataObject[]> {
		let metadataObjects = await this.availableMetadata();
		metadataObjects = await this.metadataListByTypes(metadataObjects);
		return metadataObjects;
	}
}

function combineMetadataObjects(objectsFromDescribeCall: MetadataObject[], objFromListCall: MetadataObject) : MetadataObject {
	let mainObj = objectsFromDescribeCall.find(x => x.type === objFromListCall.type);
	mainObj.addPropertiesFromMetadataListCall(objFromListCall);
	return mainObj;
}