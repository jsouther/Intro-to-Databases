module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* Get user info to display table of users*/
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

    /*Get location info to display locations in dropdown menus*/
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

    /*Get specific user info for person of updating user*/
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

    /*Route to display all users and populate location dropdowns*/
    router.get('/', function(req,res){
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["deleteUser.js"];
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
	
    /*Route to add a user, redirects to users page*/
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
	
    /*Route to URL to display one user for updating*/
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

    /*Route to URL that update data is sent in order to update a user*/
    router.put('/:Id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.Id)
        var sql = "UPDATE users SET first_name=?, last_name=?, department=?, job_title=?, pref_phone=?, pref_email=?, home_office=? WHERE Id=?";
        var inserts = [req.body.first_name, req.body.last_name, req.body.department, req.body.job_title, req.body.pref_phone, req.body.pref_email, req.body.home_office, req.params.Id];
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


/*Route to delete user*/
router.delete(/:id', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "DELETE FROM users WHERE Id = ?";
	var inserts = [req.params.Id];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.status(400);
			res.end();
		}else{
			res.status(202).end():
		}
	})
})
