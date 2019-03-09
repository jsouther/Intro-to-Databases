module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var helpers = require('handlebars-helpers')();

    function getLaptops(res, mysql, context, complete){
      mysql.pool.query("SELECT Id, make, model, sn, purchase_date, warranty_end_date, cpu, ram FROM laptops", function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        context.laptops = results;
        complete();
      });
    }

    //Get specific laptop info for purpose of updating laptop
    function getLaptop(res, mysql, context, Id, complete){
        var sql = "SELECT Id, make, model, sn, purchase_date, warranty_end_date, cpu, ram FROM laptops WHERE Id = ?";
        var inserts = [Id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.laptop = results[0];
            console.log(context.laptop);
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

  //Route to URL to display one laptop for updating
    router.get('/:Id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateLaptop.js"];
        var mysql = req.app.get('mysql');
        getLaptop(res, mysql, context, req.params.Id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-laptop', context);
            }

        }
    });

    /*Route to URL that update data is sent in order to update a laptop*/
    router.put('/:Id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.Id)
        var sql = "UPDATE laptops SET make=?, model=?, sn=?, purchase_date=?, warranty_end_date=?, cpu=?, ram=? WHERE Id=?";
        var inserts = [req.body.make, req.body.model, req.body.sn, req.body.purchase_date, req.body.warranty_end_date, req.body.cpu, req.body.ram, req.params.Id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    return router;
}();

