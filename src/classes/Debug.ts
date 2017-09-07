import debugModule = require('debug');

class Debug {

	verboseDebugger: any;
	infoDebugger: any;
	warnDebugger: any;
	errorDebugger: any;

	constructor(name: string) {
		const debuggerName = '@cellside/slide-api';
		this.verboseDebugger = debugModule(`${debuggerName}:verbose ${name}`);
		this.infoDebugger = debugModule(`${debuggerName}:info ${name}`);
		this.warnDebugger = debugModule(`${debuggerName}:warn ${name}`);
		this.errorDebugger = debugModule(`${debuggerName}:error ${name}`);
	}

	verbose(message: string, obj?: any) {
		this.write(this.verboseDebugger, message, obj);
	}

	info(message: string, obj?: any) {
		this.write(this.infoDebugger, message, obj);
	}

	warn(message: string, obj?: any) {
		this.write(this.warnDebugger, message, obj);
	}

	error(message: string, obj?: any) {
		this.write(this.errorDebugger, message, obj);
	}

	private write(logger: any, message: string, obj?: any) {
		if(obj) {
			logger(`${message} => %o`, obj);
		} else {
			logger(message);
		}
	}
}

export default Debug;
