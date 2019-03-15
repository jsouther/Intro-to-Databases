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

 function deleteLaptop(Id){
	$.ajax({
		url: '/laptops/' + Id,
		type: 'DELETE',
		success: function(result){
			console.log("delete");
			console.log(Id);
			window.location.reload(true);
		}
	})
};

 function deleteLaptopDoc(Id){
	$.ajax({
		url: '/laptop_docs/' + Id,
		type: 'DELETE',
		success: function(result){
			console.log("delete");
			console.log(Id);
			window.location.reload(true);
		}
	})
};

 function deletePeripheral(Id){
	$.ajax({
		url: '/peripherals/' + Id,
		type: 'DELETE',
		success: function(result){
			console.log("delete");
			console.log(Id);
			window.location.reload(true);
		}
	})
};

function displayPopup(){
	 var modal = document.getElementById('assignLtModal');
	 modal.style.display = "block";
	
}

function assgnDocToLt(Id) {
    $.ajax({
        url: '/laptop_laptopdocs/' + Id,
        type: 'POST',
        data: $('#update-document').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};



			