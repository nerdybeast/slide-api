import { Salesforce } from './Salesforce';
import { MetadataObject } from '../models/MetadataObject';
import { MetadataObjectBase } from '../models/MetadataObjectBase';
import { chunk, flatten } from '../utilities';

export class Metadata extends Salesforce {

	constructor(org) {
		super(org);
	}

	/**
	 * Returns a list of Metadata objects with only a few properties containing a value (see MetadataObject constructor).
	 */
	async availableMetadata() : Promise<MetadataObjectBase[]> {

		let describeMetadataResult = await this.orgGlobalMetadataDescribe();
		
		//"metaFile" seems to be true for metadata types that actually have a downloadable file...
		return describeMetadataResult.metadataObjects.filter(x => x.metaFile === true);
	}

	async metadataListByTypes(metadataObjectBases: MetadataObjectBase[]) : Promise<MetadataObject[]> {
		
		//Have to do chunks of 3 or this error occurs: "sf:LIMIT_EXCEEDED: LIMIT_EXCEEDED: No more than 3 allowed in request"
		let chunked = chunk(metadataObjectBases, 3).map((metaObjChunk: MetadataObjectBase[]) => {
			
			let query = metaObjChunk.map((metaObj: MetadataObjectBase) => {
				return { type: metaObj.xmlName };
			});

			return this.getMetadataList(query);
		});
		
		let metadataList = <MetadataObject[]>flatten(await Promise.all(chunked));

		metadataList.forEach(meta => {
			let mainObj = metadataObjectBases.find(x => x.xmlName === meta.type);
			//meta.addPropertiesFromDescribeCall(mainObj);
			meta.directoryName = mainObj.directoryName;
			meta.inFolder = mainObj.inFolder;
			meta.metaFile = mainObj.metaFile;
			meta.suffix = mainObj.suffix;
			meta.xmlName = mainObj.xmlName;
		});

		return metadataList;
	}

	async availableMetadataWithChildRecords() : Promise<MetadataObject[]> {
		let metadataObjectBases = await this.availableMetadata();
		let metadataObjects = await this.metadataListByTypes(metadataObjectBases);
		return metadataObjects;
	}
}