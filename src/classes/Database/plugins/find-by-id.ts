import Debug from '../../Debug';

let debug = new Debug('FIND-BY-ID');

export function findById(id: string) {

	return this.get(id).catch(err => {

		debug.error(`findById('${id}')`, err);

		if(err.name !== 'not_found') {

			return Promise.reject(err);
			// let ex = new Error(err.message);
			// ex = convertRollbarError(ex, err);
			
			// return rollbar.exceptionAsync(ex, {
			// 	methodName: 'getWithDefault',
			// 	params: { id }
			// });
		}

		return Promise.resolve();
	});
}