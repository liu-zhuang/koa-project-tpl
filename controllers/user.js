const devLog = require('debug')('dev'); // debugger的namespace是dev 命令行里DEBUG=dev或者*的时候才会输出
const errLog = require('debug')('err'); //错误日志
const logger = require('../util/loggerUtil');
const axios = require('axios');

const getUser = async (ctx, next) => {
	await axios.get('https://api.github.com/users/' + ctx.params.userName)
	.then(res => {
		if (res.status === 200 && res.data) {
			ctx.body = res.data;
		}
	});
}

const getList = async (ctx, next) => {
	debugger;
	await axios.get('https://api.github.com/users', {
		params: {
			since: ctx.params.page
		}
	})
	.then(res => {
		if (res.status === 200 && res.data) {
			devLog(res.data);
			ctx.body = res.data;
		}
	})
}

module.exports = {
	'Get /user/:userName': getUser,
	'Get /users/:page': getList
}