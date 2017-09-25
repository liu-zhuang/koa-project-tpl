var log4js = require('log4js');
var moment = require('moment');
var log_config = require('../config/logger');

//加载配置文件
log4js.configure(log_config);

// 返回对象
var loggerUtil = {};

var debugLogger = log4js.getLogger('debugLogger');
var errorLogger = log4js.getLogger('errorLogger');
var resLogger = log4js.getLogger('resLogger');

// 封装debug日志
loggerUtil.debug = (content) => {
    if (content) {
        debugLogger.debug(formatDebug(content));
    }
}

//封装错误日志
loggerUtil.error = function (ctx, error) {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error));
    }
};

//封装响应日志
loggerUtil.res = function (ctx) {
    if (ctx) {
        resLogger.info(formatRes(ctx));
    }
};

// 格式化debug日志 
let formatDebug = (content) => {
    let logText = new String();
    console.log(content);
     // Debug信息开始
    logText += "\n" + "*************** debug log start ***************" + "\n";
    for(let key in content) {
        logText += 'key:' + key + '\n';
        logText += 'val:' + content[key] + '\n';
    }

    logText += "*************** debug log end ***************" + "\n";

    return logText;
};

//格式化响应日志
var formatRes = function (ctx) {
    var logText = new String();

    //响应日志开始
    logText += "\n" + "*************** response log start ***************" + "\n";

    //添加请求日志
    logText += formatReqLog(ctx.request);

    //响应状态码
    logText += "response status: " + ctx.status + "\n";

    //响应内容
    logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";

    //响应日志结束
    logText += "*************** response log end ***************" + "\n";

    return logText;

}


//格式化错误日志
var formatError = function (ctx, err) {
    var logText = new String();

    //错误信息开始
    logText += "\n" + "*************** error log start ***************" + "\n";

    //添加请求日志
    logText += formatReqLog(ctx.request);

    //错误名称
    logText += "err name: " + err.name + "\n";
    //错误信息
    logText += "err message: " + err.message + "\n";
    //错误详情
    logText += "err stack: " + err.stack + "\n";

    //错误信息结束
    logText += "*************** error log end ***************" + "\n";

    return logText;
};

//格式化请求日志
var formatReqLog = function (req) {

    var logText = new String();

    var method = req.method;
    //访问方法
    logText += "request method: " + method + "\n";

    //请求原始地址
    logText += "request originalUrl:  " + req.originalUrl + "\n";

    //客户端ip
    logText += "request client ip:  " + req.ip + "\n";

    //开始时间
    var startTime;
    //请求参数
    if (method === 'GET') {
        logText += "request query:  " + JSON.stringify(req.query) + "\n";
        // startTime = req.query.requestStartTime;
    } else {
        logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
        // startTime = req.body.requestStartTime;
    }
    return logText;
}

module.exports = loggerUtil;
