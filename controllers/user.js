const devLog = require('debug')('dev'); // debugger的namespace是dev 命令行里DEBUG=dev或者*的时候才会输出
const errLog = require('debug')('err'); //错误日志
const logger = require('../util/loggerUtil');
const proxy = require('./proxy');

const getUser = async (ctx, next) => {
	await proxy.test().then(data => {
		devLog(data);
		ctx.response.type = 'application/xml';
		ctx.response.body = '<xm><data>1</data></xml>';
		return next();
	});
	// ctx.response.body = 'aaa';
}

const getList = async (ctx, next) => {
	debugger;
	ctx.response.type = 'application/json';
	ctx.response.body = [{
		name: 'pangwang',
		age: 25
	}, {
		name: 'mff',
		age: 18
	}]
}

module.exports = {
	'Get /user/:userName': getUser,
	'Get /user': getList
}