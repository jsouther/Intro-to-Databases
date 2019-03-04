module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getLaptops(res, mysql, context, complete){
      mysql.pool.query("SELECT make, model, sn, purchase_date, warranty_end_date, cpu, ram FROM laptops", function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        context.laptops = results;
        complete();
      });
    }

    router.get('/', function(req,res){
      var callbackCount = 0;
      var context = {};
      //context.jsscripts = []
      var mysql = req.app.get('mysql');
      getLaptops(res, mysql, context, complete);
      function complete(){
        callbackCount++;
        if(callbackCount >= 1){
          res.render('laptops', context);
        }
      }
    });
	
	//insert into laptops table 
	router.post('', function (req, res){
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO laptops (`make`,`model`,`sn`,`purchase_date`,`warranty_end_date`,`cpu`,`ram`) VALUES (?,?,?,?,?,?,?)";
	var inserts = [req.body.make_input, req.body.model_input, req.body.serial_input, req.body.purchase_date_input, req.body.warranty_date_input, req.body.cpu_input, req.body.ram_input];
		sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}else{
			res.redirect('/laptops');
		}
	});
});

    return router;
}();

