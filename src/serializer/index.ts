const JsonApiSerializer = require('json-api-serializer');

let serializer = new JsonApiSerializer({
	convertCase: 'camelCase'
});

let models = [{
	type: 'org',
	schema: { 
		id: 'organization_id'
	}
}, {
	type: 'version',
	schema: {}
}, {
	type: 'metadata',
	schema: {}
}];

models.forEach(model => serializer.register(model.type, model.schema));

export default serializer;