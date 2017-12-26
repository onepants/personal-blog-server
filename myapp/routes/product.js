var express = require('express');
var router = express.Router();
var url = require('url');

var MySql = require("./../md/MySql.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('子曾经曰过：中午不睡，下午崩溃');
});
router.get('/list', function(req, res, next) {
  
  MySql.connect((err)=>{
    console.log(err)
  },(db) =>{
    MySql.findData(db, 'movie' ,{},{title:1,year:1,_id:0},(result) => {
     // res.render("kind",{data:result,username:req.cookies.username}) 混合
      //分离
	    res.send(result)
    })
    
    
  })
});
module.exports = router;
