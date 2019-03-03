//module.exports = function(){
   // var express = require('express');
    //var router = express.Router();

   // function getLaptops(res, mysql, context, complete){
    //  mysql.pool.query("SELECT make, model, sn, purchase_date, warranty_end_date, cpu, ram FROM laptops", function(error, results, fields){
    //    if(error){
    //      res.write(JSON.stringify(error));
    //      res.end();
    //    }
    //    context.laptops = results;
    //    complete();
   //   });
   // }

   // router.get('/', function(req,res){
    //  var callbackCount = 0;
    //  var context = {};
      //context.jsscripts = []
    //  var mysql = req.app.get('mysql');
    //  getLaptops(res, mysql, context, complete);
    //  function complete(){
     //   callbackCount++;
    //    if(callbackCount >= 1){
      //    res.render('laptops', context);
      //  }
   //   }
   // });

   // return router;
//}();