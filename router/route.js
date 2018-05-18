var express = require('express');
var router = express.Router();

router.get('/tt', function(req, res){
  console.log(req.query);
  console.log(req.query.q);
  var x = unescape(req.query.q);
  console.log(x);
  if(x == '小学')
    console.log('zwz')
  
  res.send(`<html>
  	<head>
  	<meta charset='utf-8'>
  	<title>测试</title>
  	</head>
  	<body>
  	djkdfjdkjf我是打开快点快点
  	</body>
  	</html>`)
});

// 除了get还有post，put等方法，对应于http的请求类型
router.get('/:user', function(req, res){
  // req和res上有很多相关的属性和方法，具体可以查看手册
  res.send('you are visiting ' + req.url);
  var i = 1;
  console.log(req.params.user);
  console.log(`${i}`);
  res.end('hello, world\n');
});

router.post('/tt', function(req, res){
  console.log(req.body);
  if(req.body.q == '小学')
    console.log('zwz')

})

exports.router = router;
