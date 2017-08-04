export default function(version: string, urls) {
	
	for(let prop in urls) {
		urls[prop] = urls[prop].replace('{version}', version);
	}

	return urls;
}