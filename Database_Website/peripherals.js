module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getPeripherals(res, mysql, context, complete){
      mysql.pool.query("SELECT peripherals.Id, equip_type, make, model, users.first_name, users.last_name FROM peripherals INNER JOIN users ON users.Id = peripherals.assigned_user ORDER BY peripherals.Id ASC", function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        context.peripherals = results;
        complete();
      });
    }

    router.get('/', function(req,res){
      var callbackCount = 0;
      var context = {};
      //context.jsscripts = []
      var mysql = req.app.get('mysql');
      getPeripherals(res, mysql, context, complete);
      function complete(){
        callbackCount++;
        if(callbackCount >= 1){
          res.render('peripherals', context);
        }
      }
    });

    return router;
}();