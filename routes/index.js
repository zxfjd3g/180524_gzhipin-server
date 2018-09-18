var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/*
定义注册的路由
路由回调函编程:
1. 获取请求参数数据: req.query/param.body
2. 处理数据: 有可能需要操作数据库
3. 返回响应: res.send()/json()
 */
router.post('/register', function (req, res) {
  // 1. 获取请求参数数据: req.query/param.body
  const {username, password} = req.body
  // 2. 处理数据: 有可能需要操作数据库
  if(username==='admin') {
    // 3. 返回响应(失败)
    res.send({code: 1, msg: '此用户已存在, 请重新注册222!'})
  } else {
    // 3. 返回响应(成功)
    res.json({code: 0, data: {_id: 'abc123', username}})
  }

})


module.exports = router;
