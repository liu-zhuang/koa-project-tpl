// Core
const Koa = require('koa');
// third middleware
const devLog = require('debug')('dev'); // debugger的namespace是dev 命令行里DEBUG=dev或者*的时候才会输出
const errLog = require('debug')('err'); //错误日志
const onerror = require('koa-onerror'); // 异常处理
const cors = require('koa2-cors'); // 跨域
const helmet = require('koa-helmet'); // 安全


// custom middleware
const config = require('./config/config');
const logger = require('./util/loggerUtil');
const router = require('./util/routerUtil.js')('controllers');


const app = new Koa();

// 错误处理
onerror(app,{
	all: (err,ctx) => {
		// 记录日志
		logger.error(ctx, err);
		// 页面打印错误
		ctx.response.body = 'error';
	}
});
devLog('booting server...');
logger.debug({
	msg: 'botting server..a.'
});

app.use(cors());
app.use(helmet());
app.use(router);


app.listen(config.port);



devLog(`server is running at ${config.port}`);

