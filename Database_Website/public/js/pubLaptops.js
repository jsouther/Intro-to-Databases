
//wait until page loads
document.addEventListener('DomContentLoaded',postData());

//function to insert into Laptop table
function postData(){
	//console.log("post data started");
	document.getElementById('add_Laptop').addEventListener('click', function(event){
	event.preventDefault();	
	var sendData = '{"make_input":"' + document.getElementById('make_input').value +'","model_input":"' + document.getElementById('model_input').value +'","serial_input":"'+ document.getElementById('serial_input').value +'"';
	sendData = sendData +',"purchase_date_input":"'+ document.getElementById('purchase_date_input').value+'","warranty_date_input":"'+ document.getElementById('warranty_date_input').value +'"';
	sendData = sendData +',"cpu_input":"'+ document.getElementById('cpu_input').value+'","ram_input":"'+ document.getElementById('ram_input').value +'"}';
	
	//console.log("Yo " + sendData);
	var postReq = new XMLHttpRequest();
	postReq.open("POST", "http://localhost:28944/laptops", true);
    postReq.setRequestHeader('Content-Type', 'application/json');
	// adapted from code examples in http://eecs.oregonstate.edu/ecampus-video/CS290/core-content/ajax-forms/async-requests.html
	postReq.addEventListener('load', function(){
		if(postReq.status >= 200 && postReq.status < 400){
			//getAllLaptops();  // Jacob, do you know how to call your function that lists all the laptops from here?
			console.log("success");
			document.getElementById("newLaptop").reset();
      location.reload();
			//var response = JSON.parse(postReq.responseText);
			//document.getElementById('dataReturn').textContent = response.data;
		}
		else {
			  console.log("Error in network request: " +postReq.statusText);
	}});
	
	postReq.send(sendData);

	
	
})
}

