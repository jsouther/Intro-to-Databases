/***********************************************************
** Author:  Felicia Ottley
** Date: 11/29/18
************************************************************/
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

var mysql = require('./dbcon.js');
app.set('mysql', mysql);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 28944);
app.use('/static', express.static('public'));
app.use('/laptops', require('./laptops.js'));
app.use('/laptop_docs', require('./laptop_docs.js'));
app.use('/location', require('./location.js'));
app.use('/peripherals', require('./peripherals.js'));
app.use('/users', require('./users.js'));


app.listen(app.post('port'), function(){
	console.log("I'm listening");
});


//render the home (index) page
app.get('/index',function(req,res,next){

res.render('home');

		
});

 //render the laptops page
//app.get('/laptops',function(req,res,next){

// res.render('laptops');

		
// });

//render the locations page

// app.get('/location',function(req,res,next){

// res.render('location');

		
// });

//render the peripherals page
// app.get('/peripherals',function(req,res,next){

// res.render('peripherals');

		
// });


//render the users page
// app.get('/users',function(req,res,next){

// res.render('users');

		
// });

//render the laptop Management page
//app.get('/laptopManagement',function(req,res,next){

//res.render('laptopManagement');

		
//});


// //render the documentation page 
// app.get('/documentation',function(req,res,next){

// res.render('documentation');

		
// });



//get all from table using variable for table name totally not sure if it is possible to do it this way, with a variable.

// app.get('/get',function(req,res,next){
	
	
//console.log("here!");
//var context = {};
	//var tableName=req.body.name;
  //mysql.pool.query('SELECT * FROM ?',[tableName], function(err, rows, fields){ //think this is how you do it to prevent code injection but not 100% sure
   // if(err){
   //   next(err);
     // return;
    //}
   // context.results = JSON.stringify(rows);
   // res.type('text/plain');
	//res.send(context.results);
 // });
	
	
	
// });




//insert into laptops table  
app.post('/laptops',function(req,res,next){
var context = {};
   var make=req.body.make_input; 
   var model=req.body.model_input;
   var sn = req.body.serial_input;
   var purchaseDate = req.body.purchase_date_input;
   var warrantyDate = req.body.warranty_date_input;
   var cpu = req.body.cpu_input;
   var ram = req.body.ram_input;

  
 mysql.pool.query("INSERT INTO laptops (`make`,`model`,`sn`,`purchase_date`,`warranty_end_date`,`cpu`,`ram`) VALUES (?,?,?,?,?,?,?)", [make, model, sn, purchaseDate, warrantyDate, cpu, ram], function(err, result){
     if(err){
       next(err);
       return;
     }
	 //console.log(result);
     context.results = "Inserted id " + result.insertId;
     res.send(context.results);
   });

	
 });



 //insert into locations table  
 app.post('/locations',function(req,res,next){
   var context = {};
   var address=req.body.address_input;
   var city=req.body.city_input;
   var state = req.body.state_input;
   var zip = req.body.zip_input;
 
  
 mysql.pool.query("INSERT INTO location (`street_address`,`city`,`state`,`zip`) VALUES (?,?,?,?)", [address, city, state, zip], function(err, result){
     if(err){
       next(err);
       return;
     }
     context.results = "Inserted id " + result.insertId;
     res.send(context.results);
  });

	
 });



// //insert into peripherals table  
// app.post('/peripherials',function(req,res,next){
//   var context = {};
//   var tableName=req.body.name; 
//   var name=req.body.name;
// var reps = req.body.reps;
// var weight = req.body.weight;
// var date = req.body.date;
// var lbs = req.body.lbs;
// console.log;
  
// mysql.pool.query("INSERT INTO ?(`name`,`reps`,`weight`,`date`,`lbs`) VALUES (?,?,?,?,?)", [tableName, name, reps, weight, date, lbs], function(err, result){
//     if(err){
//       next(err);
//       return;
//     }
//     context.results = "Inserted id " + result.insertId;
//     res.send(context.results);
//   });

	
// });



// //insert into users table  
// app.post('/users',function(req,res,next){
//   var context = {};
//   var tableName=req.body.name; 
//   var name=req.body.name;
// var reps = req.body.reps;
// var weight = req.body.weight;
// var date = req.body.date;
// var lbs = req.body.lbs;
// console.log;
  
// mysql.pool.query("INSERT INTO ?(`name`,`reps`,`weight`,`date`,`lbs`) VALUES (?,?,?,?,?)", [tableName, name, reps, weight, date, lbs], function(err, result){
//     if(err){
//       next(err);
//       return;
//     }
//     context.results = "Inserted id " + result.insertId;
//     res.send(context.results);
//   });

	
// });



// //insert into laptopManagement table  
// app.post('/laptopManagement',function(req,res,next){
//   var context = {};
//   var tableName=req.body.name; 
//   var name=req.body.name;
// var reps = req.body.reps;
// var weight = req.body.weight;
// var date = req.body.date;
// var lbs = req.body.lbs;
// console.log;
  
// mysql.pool.query("INSERT INTO ?(`name`,`reps`,`weight`,`date`,`lbs`) VALUES (?,?,?,?,?)", [tableName, name, reps, weight, date, lbs], function(err, result){
//     if(err){
//       next(err);
//       return;
//     }
//     context.results = "Inserted id " + result.insertId;
//     res.send(context.results);
//   });

	
// });



// //insert into documentation table  
// app.post('/documentation',function(req,res,next){
//   var context = {};
//   var tableName=req.body.name; 
//   var name=req.body.name;
// var reps = req.body.reps;
// var weight = req.body.weight;
// var date = req.body.date;
// var lbs = req.body.lbs;
// console.log;
  
// mysql.pool.query("INSERT INTO ?(`name`,`reps`,`weight`,`date`,`lbs`) VALUES (?,?,?,?,?)", [tableName, name, reps, weight, date, lbs], function(err, result){
//     if(err){
//       next(err);
//       return;
//     }
//     context.results = "Inserted id " + result.insertId;
//     res.send(context.results);
//   });

	
// });




// //use to delete rows
// app.delete('/',function(req,res,next){
// 	console.log("I'm gonna delete somethign");
// 	var context = {};
// 	console.log(req.body.id);
// 	var id=req.body.id;
// 	mysql.pool.query("DELETE FROM workouts WHERE id = (?)",[id],function(err, result){
//     if(err){
//       next(err);
//       return;
//     }
//     context.results = "Deletedid " + result.deleteId;
//     res.type('text/plain');
// 	res.send(context.results);
//   });
	
// });


// //use to update rows
// app.put('/',function(req,res,next){
// 	console.log("I'm gonna udpate");
// 	var context = {};
// 	console.log(req.body);
// 	var id=req.body.id;
// 	mysql.pool.query("UPDATE workouts SET name=(?), reps=(?), weight=(?), date=(?), lbs=(?)  WHERE id = (?)",[req.body.name, req.body.reps, req.body.weight, req.body.editDate, req.body.lbs, id],function(err, result){
//     if(err){
//       next(err);
//       return;
//     }
//     context.results = "Deletedid " + result.deleteId;
//     res.type('text/plain');
// 	res.send(context.results);
//   });
	
// });


// //use to search
// app.get('/getEntry', function(req,res,next){
	
// 	var context = {};
// 	console.log(req.body.id);
// 	var id=req.body.id;
// 	mysql.pool.query("SELECT * FROM workouts WHERE id = (?)",[id],function(err, result){
//     if(err){
//       next(err);
//       return;
//     }
//     context.results = JSON.stringify(result);
//     res.type('text/plain');
// 	console.log(context.results);
// 	res.send(context.results);
//   });
	

	
	
	
// });

// //adapted from https://oregonstate.instructure.com/courses/1692903/assignments/7357529?module_item_id=18260871
// app.get('/reset-table',function(req,res,next){
//   var context = {};
//   mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ 
//     var createString = "CREATE TABLE workouts("+
//     "id INT PRIMARY KEY AUTO_INCREMENT,"+
//     "name VARCHAR(255) NOT NULL,"+
//     "reps INT,"+
//     "weight INT,"+
//     "date DATE,"+
//     "lbs BOOLEAN)";
//     mysql.pool.query(createString, function(err){
//       context.results = "Table reset";
//       res.render('home',context);
//     })
//   });
// });



app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') +'; press Ctrl-C to terminate.');
});
