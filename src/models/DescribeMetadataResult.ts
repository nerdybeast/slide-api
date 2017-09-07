import { MetadataObjectBase } from './MetadataObjectBase';

export class DescribeMetadataResult {
	metadataObjects: MetadataObjectBase[];
	organizationNamespace: string;
	partialSaveAllowed: boolean;
	testRequired: boolean;
}