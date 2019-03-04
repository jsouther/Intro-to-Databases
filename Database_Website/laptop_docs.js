module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getLaptopDocs(res, mysql, context, complete){
      mysql.pool.query("SELECT title, doc_link, laptops.make, laptops.model FROM laptop_docs INNER JOIN laptops ON laptops.Id = laptop_docs.Id", function(error, results, fields){
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
