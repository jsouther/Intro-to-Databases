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
			