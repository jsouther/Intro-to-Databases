




module.exports = function(){
    var express = require('express');
    var router = express.Router();
	

function getLaptops(res, mysql, context, complete){
	mysql.pool.query("SELECT DISTINCT make, model FROM laptops ORDER BY make, model", function(error, results, fields){
		if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
		context.laptops = results;
		complete()
	});
}


function getAssignedDocs(res, mysql, context, complete, make, model){
	var sql = "SELECT DISTINCT laptop_docs.title FROM laptop_docs INNER JOIN laptops_laptopdocs ON laptop_docs.Id = laptops_laptopdocs.doc_id INNER JOIN laptops ON laptops.Id = laptops_laptopdocs.lt_id WHERE laptops.make = ? AND laptops.model = ?";
	var inserts = [make, model];
	mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
		context.laptops = results;
		complete()
	});
}



	
	
	    /*Route to display page*/
    router.get('/', function(req,res){
      var callbackCount = 0;
      var context = {};
       context.jsscripts = ["manageLaptop_LaptopDocs.js"];
	   var mysql = req.app.get('mysql');
      getLaptops(res, mysql, context, complete);
      function complete(){
        callbackCount++;
        if(callbackCount >= 1){
          res.render('laptop_laptopdocs', context);
        }
      }
    });
	
	/*Route to display selected docs*/
    router.post('/search', function(req,res){
      console.log("HERE!!!");
	  console.log(req.body.laptop);
	var params = JSON.parse(req.body.laptop);
	  console.log(params);
	  console.log(params.make);
	  console.log(params.model);
	  var callbackCount = 0;
      var context = {};
      context.jsscripts = ["manageLaptop_LaptopDocs.js"];
	  var mysql = req.app.get('mysql');
      getAssignedDocs(res, mysql, context, complete, params.make, params.model);
      function complete(){
      callbackCount++;
		if(callbackCount >= 1){
			console.log(context);
			res.render('laptop_laptopdocs', context);
		}
		}
    });
	
/*	
   
   //insert into laptop_laptopdocs table 
	router.post('', function (req, res){
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO laptops_laptopdocs (`lt_id`, `doc_id`) VALUES (?,?)";
	var inserts = [req.body.lt_id_input, req.body.doc_id_input];
		sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}else{
			res.redirect('/laptop_laptopdocs');
		}
	});
});
  */ 
    
    
    
        return router;
}();
