import debugModule = require('debug');

class Debug {

	verboseDebugger: any;
	infoDebugger: any;
	warnDebugger: any;
	errorDebugger: any;

	constructor(name: string) {
		let debuggerName = 'slide-api'
		this.verboseDebugger = debugModule(`${debuggerName}:verbose ${name}`);
		this.infoDebugger = debugModule(`${debuggerName}:info ${name}`);
		this.warnDebugger = debugModule(`${debuggerName}:warn ${name}`);
		this.errorDebugger = debugModule(`${debuggerName}:error ${name}`);
	}

	private getMessage(message: string, obj?: any) : string {
		return obj ? `${message} => %o` : message;
	}

	info(message: string, obj?: any) {
		this.infoDebugger(this.getMessage(message, obj), obj);
	}

	error(message: string, obj?: any) {
		this.errorDebugger(this.getMessage(message, obj), obj);
	}
}

export default Debug;
