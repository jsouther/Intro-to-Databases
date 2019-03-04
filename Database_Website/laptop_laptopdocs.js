//don't see a place in the web pages to attach this yet.

module.exports = function(){
    var express = require('express');
    var router = express.Router();
   
   //insert into laptop_laptopdocs table 
	router.post('', function (req, res){
	var mysql = req.app.get('mysql');
	var sql = "INSERT INTO laptop_laptopdocs (`lt_id`, `doc_id`) VALUES (?,?)";
	var inserts = [req.body.lt_id_input, req.body.doc_id_input];
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
