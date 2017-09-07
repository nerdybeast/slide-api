export class ServiceError {
	title: string;
	message: string;
	stack: string = null;
	statusCode: number;
	errorCode: string = null;

	constructor(statusCode: number, errorCode: string, title?: string, message?: string) {
		this.statusCode = statusCode;
		this.errorCode = errorCode;
		this.title = title || null;
		this.message = message || null;
	}

	add(error: Error) : void {
		this.title = error.name;
		this.message = error.message;
		this.stack = error.stack;
	}
}