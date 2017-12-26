var express = require('express');
var router = express.Router();
var MySql = require("./../md/MySql.js");
var async = require("async");

/* GET home page. */
router.get('/', function(req, res, next) {
  
//if(req.cookies.username){
//	res.render('index',{title:'我的博客'});
//}else{
//	res.render('login', { title: '我的博客--登录' });
//}


var task1 = function(callback){
	MySql.connect((err) => {
    console.log(err)
  }, (db) => {
     console.log("数据库连接成功")
     MySql.findData(db, "banner", {}, {}, (result1) => {
     	file1 = result1;
     	console.log(file1[0].src)
     	return file1;
      //res.render('banner', {title:"图片管理", list: result1.slice(0) });
      db.close();
     })
  })
	callback(null,"task1");  
}
  
  
//MySql.connect((err) => {
//  console.log(err)
//}, (db) => {
//   console.log("数据库连接成功")
//   MySql.findData(db, "banner", {}, {}, (result2) => {
//   	console.log(result2);
//   	console.log("nihao")
//   	file2 = result2;
//    //res.render('banner', {title:"图片管理", list: result });
//    db.close();
//   })
//})
  
  var task2 = function(callback){
  	if(req.cookies.username){
			res.render('index',{title:'我的博客',file:file1});
		}else{
			res.render('login', { title: '我的博客--登录'});
		}
		callback(null,"task2");
  }
	
	async.series({task1,task2},function(err,result){  
  
   // console.log("series");  
   
    console.log(result);  
	}) 
  
});

module.exports = router;
