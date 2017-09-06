import Debug from '../../Debug';

let debug = new Debug('FIND-BY-ID');

export function findById(id: string) {

	return this.get(id).catch(err => {

		if(err.name !== 'not_found') {

			debug.error(`findById('${id}')`, err);

			return Promise.reject(err);

			//TODO:
			// let ex = new Error(err.message);
			// ex = convertRollbarError(ex, err);
			
			// return rollbar.exceptionAsync(ex, {
			// 	methodName: 'getWithDefault',
			// 	params: { id }
			// });
		}

		debug.info(`The id "${id}" does not exist in the database.`);

		return Promise.resolve();
	});
}