 function deleteUser(Id){
	$.ajax({
		url: '/users/' + Id,
		type: 'DELETE',
		success: function(result){
			console.log("delete");
			window.location.reload(true);
		}
	})
};

 function deleteLocation(Id){
	$.ajax({
		url: '/location/' + Id,
		type: 'DELETE',
		success: function(result){
			console.log("delete");
			console.log(Id);
			window.location.reload(true);
		}
	})
};



			