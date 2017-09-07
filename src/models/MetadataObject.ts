import { MetadataObjectBase } from './MetadataObjectBase';

export class MetadataObject extends MetadataObjectBase {
	createdById: string; //"005f4000000ttSAAAY"
	createdByName: string; //"Michael Penrod"
	createdDate: string; //"2017-08-18T02:05:34.000Z"
	fileName: string; //"staticresources/Test1.resource"
	fullName: string; //"Test1"
	id: string; //"081f4000000IuYpAAK"
	lastModifiedById: string; //"005f4000000ttSAAAY"
	lastModifiedByName: string; //"Michael Penrod"
	lastModifiedDate: string; //"2017-08-21T23:46:10.000Z"
	manageableState: string; //"unmanaged"
	type: string; //"StaticResource"

	constructor(metaBase?: MetadataObjectBase, metaObject?: MetadataObject) {
		
		super(metaBase);
		
		if(metaObject) {
			this.setOwnProperties(metaObject);
		}
	}

	setOwnProperties(metaObject: MetadataObject) : void {
		this.createdById = metaObject.createdById;
		this.createdByName = metaObject.createdByName;
		this.createdDate = metaObject.createdDate;
		this.fileName = metaObject.fileName;
		this.fullName = metaObject.fullName;
		this.id = metaObject.id;
		this.lastModifiedById = metaObject.lastModifiedById;
		this.lastModifiedByName = metaObject.lastModifiedByName;
		this.lastModifiedDate = metaObject.lastModifiedDate;
		this.manageableState = metaObject.manageableState;
		this.type = metaObject.type;
	}
}