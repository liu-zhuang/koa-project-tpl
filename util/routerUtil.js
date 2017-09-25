const path = require('path');


const devLog = require('debug')('dev');

// 返回path路径下的所有js文件
var readFile = function (p) {
	const fs = require('fs');
	const folderPath = path.resolve(path.dirname(__dirname), p);

	var files = fs.readdirSync(folderPath);
	var jsFiles = files.filter((f) => {
		return f.endsWith('.js');
	});
	return jsFiles;
};

// 根据.js文件反射路由
var SetRouter = function (p) {
	// 声明路由
	var router = require('koa-router')();
	router.prefix('/api');
	var jsFiles = readFile(p);
	const folderPath = path.resolve(path.dirname(__dirname), p);
	for (var js of jsFiles) {
		let mapping = require(folderPath + '/' + js); //分别引入每个js文件
		for (var url in mapping) {
			// 遍历每个controller文件中的路由
			if(url.startsWith('Get')) {
				// method: get
				router.get(url.replace('Get ',''), mapping[url]);
			} else if (url.startsWith('Post'),mapping[url]) {
				// method: post
				router.post(url.replace('Post ',''), mapping[url]);
			} else {
				// 非路由的
				console.log('this is not router file');
			}
		}
	}
	return router.routes();
};


module.exports = function (p) {
	return SetRouter( p || 'controllers');
};
