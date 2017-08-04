export default function(orgType: string) : string {
	
	orgType = orgType.toLowerCase();
	let domain;

	switch(orgType) {
		case 'production': domain = 'login'; break;
		default: domain = 'test'; break;
	}

	return `https://${domain}.salesforce.com`;
}