var express=require('express');
var logger=require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db = require('./config/database.js');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'})); // get information from html forms
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser("An"));
app.use(session({
    secret:'an',
    resave:false,
    saveUninitialized:true
}));

// 当前目录的public目录作为web服务根目录
// 所以可以把静态资源放在这个目录下
// 当请求/...时，就会自动响应这些文件给浏览器
// 比如打开浏览器，会自动访问/，也就是/index.html，
// 所以就会返回根目录下的index.html文件
// 静态资源路径,image,css,js等文件
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.get('/', function(req, res) {
// 	console.log('index.ejs');
// 	res.render('index.ejs'); // load the index.ejs file
// });

// var router = require('./router/route.js').router;
	// 当请求url为 /ddd/...时，就会调用这个router对应的处理方法
	// 比如当GET  /ddd/test时，就会返回“you are visiting ...”
	//（见route.js）
// app.use('/ddd', router);
var index = require('./router/index.js').router; 
var user = require('./router/user.js').router;
// var learn = require('./router/learn.js').router;

app.use('/', index);
app.use('/user', user);
// app.use('/learn', learn);

app.use(function(req, res, next){
	console.log('err1');
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// if (app.get('env') === 'development') {
// 	console.log('err2');
// 	app.use(function(err, req, res, next) {
// 		res.status(err.status || 500);
// 		res.render('error', {
// 			message: err.message,
// 			error: err
// 		});
// 	});
// }

app.use(function(err, req, res, next) {
	console.log('err3');
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

// 开启web服务，在8080端口
app.listen(8080, function(){
	console.log('Express server listening on port 8080');
});
