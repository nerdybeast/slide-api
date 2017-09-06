import { MetadataObject } from './MetadataObject';

export class GlobalMetadataDescription {
	metadataObjects: MetadataObject[];
	organizationNamespace: string;
	partialSaveAllowed: boolean;
	testRequired: boolean;
}