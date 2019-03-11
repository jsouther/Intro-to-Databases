module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Get document info to display table of documents*/
   	function getLaptopDocs(res, mysql, context, complete){
      mysql.pool.query("SELECT laptop_docs.Id, title, doc_link, laptops.make, laptops.model FROM laptop_docs LEFT JOIN laptops_laptopdocs ON laptops_laptopdocs.doc_id = laptop_docs.Id LEFT JOIN laptops ON laptops.Id = laptops_laptopdocs.lt_id", function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        context.laptop_docs = results;
        complete();
      });
    }

    /*Get specific document info for purpose of updating document*/
    function getDocument(res, mysql, context, Id, complete){
        var sql = "SELECT Id, title, doc_link FROM laptop_docs WHERE Id = ?";
        var inserts = [Id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.document = results[0];
            complete();
        });
    }

    /*Route to display all documents*/
    router.get('/', function(req,res){
      var callbackCount = 0;
      var context = {};
       context.jsscripts = ["deleteFunctions.js"];
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

    /*Route to URL to display one document for updating*/
    router.get('/:Id', function(req, res){
      callbackCount = 0;
      var context = {};
      context.jsscripts = ["updateDoc.js"];
      var mysql = req.app.get('mysql');
      getDocument(res, mysql, context, req.params.Id, complete);
      function complete(){
        callbackCount++;
        if(callbackCount >= 1){
            res.render('update-document', context);
        }
      }
    });

    /*Route to URL that update data is sent in order to update a user*/
    router.put('/:Id', function(req, res){
      var mysql = req.app.get('mysql');
      console.log(req.body)
      console.log(req.params.Id)
      var sql = "UPDATE laptop_docs SET title=?, doc_link=? WHERE Id=?";
      var inserts = [req.body.title, req.body.doc_link, req.params.Id];
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
    
    /*Route to delete laptopDoc*/
    router.delete('/:Id', function(req, res){
    	var mysql = req.app.get('mysql');
    	//console.log("DELETING!!");
    	var sql = "DELETE FROM laptop_docs WHERE Id=?";
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
    });

    return router;
}();
