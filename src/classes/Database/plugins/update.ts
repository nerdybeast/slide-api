import Debug from '../../Debug';
let debug = new Debug('db-update');

export function update(doc) {

	return this.findById(doc._id).then(foundDoc => {

		if(foundDoc) {
			doc._rev = foundDoc._rev;
		}

		return this.put(doc);

	}).then(updateResult => {

		debug.info(`updateResult on doc ${doc._id}`, updateResult);
		return this.findById(doc._id);

	}).catch(err => {

		debug.error(`updateResult error on doc ${doc._id}`, err);
		
		// let ex = new Error(err.message);
		// ex = convertRollbarError(ex, err);

		// //Strip out just these properties to send to rollbar, we don't want to send sensitive user info.
		// let { type, _id } = doc;

		// return rollbar.exceptionAsync(ex, {
		// 	methodName: 'update',
		// 	params: { type, _id }
		// });

		return Promise.reject(err);
	});

}