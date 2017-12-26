var express = require('express');
var router = express.Router();
var url = require('url');
var md5 = require('md5');

var MySql = require("./../md/MySql.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/loginAction', function(req, res, next) {
//res.send('登录');
  var obj = url.parse(req.url, true).query;
  obj.password = md5(obj.password)
  /**
   * 查询数据库，是不是存在该用户，
   * 如果存在，继续判断账户名密码是不是匹配
   * 如果匹配，返回1， --- 登录成功
   * 如果不匹配，返回2 ---- 密码错误
   * 如果不存在该用户，那么返回0
   * 数据库错误，返回-1
   */
  MySql.connect((err) => {
    res.send('-1')
  },(db) => {
    MySql.findData(db, 'user',{username: obj.username},{}, (result1) => {
      if(result1.length > 0){
        MySql.findData(db, 'user',obj,{}, (result2) => {
          if(result2.length > 0){//匹配成功
            //后台可以记录登录状态-----cookie
            res.cookie("username",obj.username)
            res.send('1');
          }else{
            res.send('2')
          }
          db.close();
        })
      }else{//没有该用户
        res.send('0')
      }
      db.close();
    })
  }); 
});

router.post('/registerAction', function(req, res, next) {
  var obj = req.body;
  console.log(obj)
  obj.password = md5(obj.password)//加密
  /**
   * 查询数据库，是不是存在该用户，
   * 如果存在，则返回0，表示用户已存在，
   * 如果不存在，则返回1，表示注册成功
   * 其他(数据库发生错误)错误返回2
   */
  
  MySql.connect((err) => {
    res.send('2');
  },(db) => {
    console.log("数据库连接成功")
    MySql.findData(db, "user", {username: obj.username}, {_id:0}, (result) => {
      if(result.length == 0){//没有用户
        MySql.insert(db,'user',obj,(result) => {
          console.log(result);
          res.send('1');
          db.close();
        })
      }else{
        res.send('0');
      }
      
      db.close();
    })
  })
});

router.post('/adminLogin',function(req, res, next){
	var obj = req.body;
	console.log(obj)
	obj.password = md5(obj.password)

	MySql.connect((err) =>{
		console.log(err)
	},(db) => {
		MySql.findData(db,"admin",obj,{},(result) => {
			if(result.length == 0){
				res.send("0")
			}else{
				res.cookie("username","obj.username")
				res.send("1")
			}
		})
	})
})

router.get("/adminLogout", (req,res,next) => {
  res.clearCookie("username");
res.redirect("/")
//res.send("<script>window.location.href='/'</script>")
})


module.exports = router;
