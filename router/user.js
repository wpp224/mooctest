var express = require('express');
var router = express.Router();
var db = require('../config/database.js');

router.post('/',function(req,res){
	client=usr.connect();
	var admin_id = req.body.admin_id;
	var admin_psd = req.body.admin_psd;
	usr.loginFun(client,admin_id, function (results) {
		if(results==''){
			res.locals.error = '用户不存在';
			res.render('index', { title: 'smartCampus' });
			return;
		}else{
			if(results[0].admin_psd==admin_psd){
				res.locals.islogin=admin_id;//记录登录用户名
				res.cookie('islogin',res.locals.islogin,{maxAge:60000});
				res.redirect('success');
				return;
			}else{
				res.locals.error = '密码错误';
				res.render('index', { title: 'smartCampus' });
				return;
			}
		}
	});
});

router.get('/login', function(req, res){
	if (req.session.islogin) {
		res.locals.islogin = req.session.islogin;
	}
	if (req.cookies.islogin) {
		req.session.islogin = req.cookies.islogin;
	}
	res.render('login', {
		title: '用户登录',
		test: res.locals.islogin
	});

  // console.log('login');
  // console.log('req.query');
  // res.render('login.ejs', req);
});

router.post('/login', function(req, res) {
	client = db.connect();
	result = null;

	//zwz
	// db.login(id, pw, function(isValid){

	// })

	db.selectFun(client, req.body.LearnerID, function(result) {
		if (result[0] === undefined) {
			res.send('没有该用户');
		}else{
			if (result[0].LPwd === req.body.LPwd) {
				req.session.islogin = req.body.LearnerID;
				res.locals.islogin = req.session.islogin;
				res.cookie('islogin', res.locals.islogin, {maxAge:60000});
				res.redirect('/index');
			} else {
				res.redirect('/login');
			}
		}
	});
});

// signup
// router.get('/signup', function(req, res){
//   console.log('signup');
//   res.render('signup.ejs', req);
// });

// logout
router.get('/logout', function(req, res){
	res.clearCookie('islogin');
	req.session.destroy();
	res.redirect('/');

	console.log('logout');
	console.log('req.query');
	res.send(`logout`);
});

exports.router = router;
