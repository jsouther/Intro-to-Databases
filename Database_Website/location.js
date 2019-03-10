module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getLocations(res, mysql, context, complete){
      mysql.pool.query("SELECT Id, street_address, city, state, zip FROM location", function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        context.location = results;
        complete();
      });
    }

    router.get('/', function(req,res){
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["deleteFunctions.js"];
      var mysql = req.app.get('mysql');
      getLocations(res, mysql, context, complete);
      function complete(){
        callbackCount++;
        if(callbackCount >= 1){
          res.render('location', context);
        }
      }
    });
	
//insert into location table
router.post('/', function (req, res){
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO location (`street_address`,`city`,`state`,`zip`) VALUES (?,?,?,?)";
	var inserts = [req.body.address_input, req.body.city_input, req.body.state_input, req.body.zip_input];
	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}else{
			res.redirect('/location');
		}
	});
});

/*Route to delete user*/
router.delete('/:Id', function(req, res){
	var mysql = req.app.get('mysql');
	console.log("DELETING!!");
	var sql = "DELETE FROM location WHERE Id=?";
	var inserts = [req.params.Id];
	console.log(req.params.Id);
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

