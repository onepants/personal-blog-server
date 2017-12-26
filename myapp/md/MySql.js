var MongoClient = require("mongodb").MongoClient;
var CONNECT_STR = "mongodb://localhost:27017/bk1719";

module.exports = {
  connect(errBack,callback){
    MongoClient.connect(CONNECT_STR, (err, db) => {
      if(err){
        console.log(err)
        errBack(err)
      }else{
        callback(db)
      }
    })
  },
  insert(db, collectionName, insertData, callback ){
    db.collection(collectionName).insert(insertData, (err, result) => {
     if(err){
       console.log(err)
     }else{
//     console.log(result);
       callback(result);
     }
   })
  },
  //在whereobj条件下找出showObj的字段的数据
  findData(db, collectionName, whereobj, showObj, callback){
    db.collection(collectionName).find(whereobj, showObj).toArray((err, result) => {
      if(err){
        console.log(err);
      }else{
        //result即为[{},{},{}]
        callback(result);
      }
    })
  },
  //在whereobj条件下找出showObj的字段的数据，并且以sortObj进行排序
  findSortData(db, collectionName, whereobj, showObj,sortObj, callback){
    db.collection(collectionName).find(whereobj, showObj).sort(sortObj).toArray((err, result) => {
      if(err){
        console.log(err);
      }else{
        //result即为[{},{},{}]
        callback(result);
      }
    })
  },
  //分页---在whereobj条件下找出showObj的字段的数据,并且进行分页，每页显示pageSize个，当前页数为pageNumber
  findPagingData(db, collectionName, whereobj, showObj, pageNumber, pageSize, callback){
    db.collection(collectionName).find(whereobj, showObj).skip(pageNumber * pageSize).limit(pageSize).toArray((err, result) => {
      if(err){
        console.log(err);
      }else{
        //result即为[{},{},{}]
        callback(result);
      }
    })
  },
  //区间  --- 价格  500-1000
  findRangeData(db, collectionName, rangeData, showObj, callback){
    //rangeData   {year:{$gte:'1994',$lte:'2000'}}
    db.collection(collectionName).find(rangeData,showObj).toArray((err, result) => {
      if(err){
        console.log(err);
      }else{
        //result即为[{},{},{}]
        callback(result);
      }
    })
  },
  //搜索
  findSearchData(db, collectionName, searchData,showObj,callback){
    //searchData  {title:/的/}
    db.collection(collectionName).find(searchData,showObj).toArray((err, result) => {
      if(err){
        console.log(err);
      }else{
        //result即为[{},{},{}]
        callback(result);
      }
    })
  },
  //优惠券
  findDisCountData(db, collectionName, disCountData,showObj,callback){
//  disCountData    {title:{$exists:true}}
    db.collection(collectionName).find(disCountData,showObj).toArray((err, result) => {
      if(err){
        console.log(err);
      }else{
        //result即为[{},{},{}]
        callback(result);
      }
    })
  },
  //特殊情怀  --  喜欢94.93年电影
  findMoreValData(db, collectionName, moreValData,showObj,callback){
//  moreValData   {$or:[{year:"1993"},{year:"1994"}]}
    db.collection(collectionName).find(moreValData,showObj).toArray((err, result) => {
      if(err){
        console.log(err);
      }else{
        //result即为[{},{},{}]
        callback(result);
      }
    })
  },
  updateData(){
    
  },
  deleteOneData(db, collectionName, data, callback){
    db.collection(collectionName).deleteOne(data,(err, result) => {
      if(err){
        console.log(err);
      }else{
        callback(result);
      }
    })
  },
  deleteManyData(db, collectionName, data, callback){
    db.collection(collectionName).deleteMany(data,(err, result) => {
      if(err){
        console.log(err);
      }else{
        callback(result);
      }
    })
  }
}


