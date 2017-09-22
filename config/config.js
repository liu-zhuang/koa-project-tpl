const devConfig = require('./dev');
const testConfig = require('./test');
const productConfig = require('./product');

const config = {
	development: devConfig,
	test: testConfig,
	production: productConfig
};

// 根据环境变量来设置配置
module.exports = config[process.env.NODE_ENV || 'development'];