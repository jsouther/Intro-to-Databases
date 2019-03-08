module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getLaptopDocs(res, mysql, context, complete){
      mysql.pool.query("SELECT title, doc_link, laptops.make, laptops.model FROM laptop_docs LEFT JOIN laptops_laptopdocs ON laptops_laptopdocs.doc_id = laptop_docs.Id LEFT JOIN laptops ON laptops.Id = laptops_laptopdocs.lt_id") {
		  function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
@@ -26,6 +26,22 @@ module.exports = function(){
        }
      }
    });

	  //insert into laptop_docs table 
	router.post('', function (req, res){
	//console.log("adding!");
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO laptop_docs (`title`, `doc_link`) VALUES (?,?)";
	var inserts = [req.body.title_input, req.body.link_input];
		sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}else{
			res.redirect('/laptop_docs');
		}
	});
});

    return router;
}(); 

        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        context.laptop_docs = results;
        complete();
      });
    }

    router.get('/', function(req,res){
      var callbackCount = 0;
      var context = {};
      //context.jsscripts = []
      var mysql = req.app.get('mysql');
      getLaptopDocs(res, mysql, context, complete);
      function complete(){
        callbackCount++;
        if(callbackCount >= 1){
          res.render('laptop_docs', context);
        }
      }
    });
    
	  //insert into laptop_docs table 
	router.post('', function (req, res){
	//console.log("adding!");
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO laptop_docs (`title`, `doc_link`) VALUES (?,?)";
	var inserts = [req.body.title_input, req.body.link_input];
		sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}else{
			res.redirect('/laptop_docs');
		}
	});
});
    
    
    

    return router;
}();
