import { MetadataTypeDescription } from "./MetadataTypeDescription";

export class MetadataObject {
	createdById: string; //"005f4000000ttSAAAY"
	createdByName: string; //"Michael Penrod"
	createdDate: string; //"2017-08-18T02:05:34.000Z"
	directoryName: string; //"staticresources"
	fileName: string; //"staticresources/Test1.resource"
	fullName: string; //"Test1"
	id: string; //"081f4000000IuYpAAK"
	inFolder: boolean;
	lastModifiedById: string; //"005f4000000ttSAAAY"
	lastModifiedByName: string; //"Michael Penrod"
	lastModifiedDate: string; //"2017-08-21T23:46:10.000Z"
	manageableState: string; //"unmanaged"
	metaFile: boolean;
	suffix: string; //"resource"
	type: string; //"StaticResource"

	constructor(metadataObject?: any) {

		if(!metadataObject) return;

		this.directoryName = metadataObject.directoryName;
		this.inFolder = metadataObject.inFolder;
		this.metaFile = metadataObject.metaFile;
		this.suffix = metadataObject.suffix;
		this.type = metadataObject.xmlName;
	}

	addPropertiesFromMetadataListCall(metadataObject: MetadataObject) : void {
		this.createdById = metadataObject.createdById;
		this.createdByName = metadataObject.createdByName;
		this.createdDate = metadataObject.createdDate;
		this.fileName = metadataObject.fileName;
		this.fullName = metadataObject.fullName;
		this.id = metadataObject.id;
		this.lastModifiedById = metadataObject.lastModifiedById;
		this.lastModifiedByName = metadataObject.lastModifiedByName;
		this.lastModifiedDate = metadataObject.lastModifiedDate;
		this.manageableState = metadataObject.manageableState;
	}
}