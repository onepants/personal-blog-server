var express = require('express');
var router = express.Router();
var MySql = require("./../md/MySql.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render("articles",{title:"文章管理"});
});

router.post("/addArticle", function(req, res, next) {
   var obj = req.body;
   console.log(obj)
   
   MySql.connect((err)=>{
     console.log(err)
   },(db)=>{
     MySql.findData(db,"articles",{},{},(result) => {
      obj.articleID = result.length;
      MySql.insert(db, "articles", obj ,(results) => {
        res.send("1") 
        db.close();
      })
      db.close();
     })
   })
    
});

router.get("/articleList", (req, res, next) =>{
  MySql.connect((err)=>{
     console.log(err)
   },(db)=>{
     MySql.findData(db,"articles",{},{_id:0,title:1,articleID:1},(result) => {
       res.send(JSON.stringify(result))
      db.close();
     })
   })
})
router.post("/articleDetail", (req, res, next) =>{
  var obj = req.body;
  obj.articleID =  obj.articleID * 1;
  MySql.connect((err)=>{
     console.log(err)
   },(db)=>{
     MySql.findData(db,"articles",obj,{_id:0},(result) => {
       res.send(JSON.stringify(result))
      db.close();
     })
   })
})

module.exports = router;
