module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getPeripherals(res, mysql, context, complete){
      mysql.pool.query("SELECT peripherals.Id, equip_type, make, model, users.first_name, users.last_name FROM peripherals LEFT JOIN users ON users.Id = peripherals.assigned_user ORDER BY peripherals.Id ASC", function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        context.peripherals = results;
        complete();
      });
    }

    /*Route to display peripherals*/
    router.get('/', function(req,res){
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["deleteFunctions.js"];
      var mysql = req.app.get('mysql');
      getPeripherals(res, mysql, context, complete);
      function complete(){
        callbackCount++;
        if(callbackCount >= 1){
          res.render('peripherals', context);
        }
      }
	  });  
	 
  /* Route to add peripheral*/
	router.post('', function(req, res) {
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO peripherals(`equip_type`,`make`,`model`) VALUES (?,?,?)";
    var inserts = [req.body.type_input, req.body.make_input, req.body.model_input] 
    		sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      	if(error){
      		res.write(JSON.stringify(error));
      		res.end();
      	}else{
      		res.redirect('/peripherals');
      	}
	  });
  });
	
	/*Route to delete peripheral*/
router.delete('/:Id', function(req, res){
	var mysql = req.app.get('mysql');
	//console.log("DELETING!!");
	var sql = "DELETE FROM peripherals WHERE Id=?";
	var inserts = [req.params.Id];
	//console.log(req.params.Id);
	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			console.log("error!!!!");
			res.write(JSON.stringify(error));
			res.status(400);
			res.end();
		}else{
			res.status(202).end();
		//	console.log("deleted");
		}
	})
})

	

    return router;
}();