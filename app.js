const Koa = require('koa');
const app = new Koa();

const config = require('./config/config');


app.use(ctx=>{
	ctx.response.body = 'haha';
});

app.listen(config.port);


console.log('server is running at ' + config.port);

