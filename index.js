const createError = require('http-errors');

module.exports = (delay, options={}) => async (ctx, next) => {
	const status  = options.status || 408;
	const message = options.message || 'request time-out';
	const callback = options.callback || function(){};
	let timer; 
	const timeout = new Promise((_, reject) => {
		timer = setTimeout(() => {
			ctx.state.timeout = true;
			reject(createError(status, message));
			callback(ctx, delay);
		}, delay);
	});
	await Promise.race([timeout, next()]);
	clearTimeout(timer);	
}