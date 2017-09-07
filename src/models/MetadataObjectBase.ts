export class MetadataObjectBase {
	directoryName: string; //"staticresources"
	inFolder: boolean;
	metaFile: boolean;
	suffix: string; //"resource"
	xmlName: string; //"StaticResource"

	constructor(metadataObjectBase?: MetadataObjectBase) {
		this.addPropertiesFromDescribeCall(metadataObjectBase);
	}

	addPropertiesFromDescribeCall(metadataObjectBase?: MetadataObjectBase) : void {
		
		if(!metadataObjectBase) return;
		
		this.directoryName = metadataObjectBase.directoryName;
		this.inFolder = metadataObjectBase.inFolder;
		this.metaFile = metadataObjectBase.metaFile;
		this.suffix = metadataObjectBase.suffix;
		this.xmlName = metadataObjectBase.xmlName;
	}
}