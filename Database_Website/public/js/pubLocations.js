//wait until page loads
document.addEventListener('DomContentLoaded',postData());


//function to insert into Location table
function postData(){
	//console.log("post data started");
	document.getElementById('add_Location').addEventListener('click', function(event){
	event.preventDefault();	
	var sendData = '{"address_input":"' + document.getElementById('address_input').value +'","city_input":"' + document.getElementById('city_input').value +'","state_input":"'+ document.getElementById('state_input').value +'","zip_input":"'+ document.getElementById('zip_input').value +'"}';
	
	//console.log("Yo " + sendData);
	var postReq = new XMLHttpRequest();
	postReq.open("POST", "http://localhost:28944/locations", true);
    postReq.setRequestHeader('Content-Type', 'application/json');
	// adapted from code examples in http://eecs.oregonstate.edu/ecampus-video/CS290/core-content/ajax-forms/async-requests.html
	postReq.addEventListener('load', function(){
		if(postReq.status >= 200 && postReq.status < 400){
			//getAllLaptops();  // Jacob, do you know how to call your function that lists all the laptops from here?
			document.getElementById("newAddress").reset();
			//var response = JSON.parse(postReq.responseText);
			//document.getElementById('dataReturn').textContent = response.data;
		}
		else {
			  console.log("Error in network request: " +postReq.statusText);
	}});
	
	postReq.send(sendData);

	
})
}