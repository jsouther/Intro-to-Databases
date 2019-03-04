module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getUsers(res, mysql, context, complete){
      mysql.pool.query("SELECT users.Id, first_name, last_name, department, job_title, pref_phone, pref_email, location.city, location.state FROM users INNER JOIN location ON location.Id = users.home_office", function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        context.users = results;
        complete();
      });
    }

   function getLocations(res, mysql, context, complete){
        mysql.pool.query("SELECT Id, city FROM location", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.location = results;
            complete();
        });
    }

    function getUser(res, mysql, context, Id, complete){
        var sql = "SELECT Id, first_name, last_name, department, job_title, pref_phone, pref_email, home_office FROM users WHERE Id = ?";
        var inserts = [Id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.user = results[0];
            complete();
        });
    }

    router.get('/', function(req,res){
      var callbackCount = 0;
      var context = {};
      //context.jsscripts = []
      var mysql = req.app.get('mysql');
      getUsers(res, mysql, context, complete);
      getLocations(res, mysql, context, complete);
      function complete(){
        callbackCount++;
        if(callbackCount >= 2){
          res.render('users', context);
        }
      }
    });
	
	router.post('', function(req, res) {
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO users(`first_name`,`last_name`,`department`,`job_title`,`pref_phone`,`pref_email`,`home_office`) VALUES (?,?,?,?,?,?,?)";
	var inserts = [req.body.fname_input, req.body.lname_input, req.body.department_input, req.body.title_input, req.body.phone_input, req.body.email_input, req.body.location] 
			sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}else{
			res.redirect('/users');
		}
	});

	  
	  
    });
	

    router.get('/:Id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedLocation.js", "updateUser.js"];
        var mysql = req.app.get('mysql');
        getUser(res, mysql, context, req.params.Id, complete);
        getLocations(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-user', context);
            }

        }
    });

    return router;
}();