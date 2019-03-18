function assignDocs(Id){
    $.ajax({
        url: '/users/' + Id,
        type: 'PUT',
        data: $('#update-user').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

function getDocs(makemodel){
   // $.ajax({
		console.log(makemodel);
		
        //url: '/laptop_laptopdocs',
      //  type: 'GET',
//data: {
//'make:' + make,
	//	'model:' + model,
	//	},
//success: function(result){
//window.location.replace("./");
     //   }
   // })
};