/***********************************************************
** Author:  Felicia Ottley and Jacob Southern
** Date: 11/4/18
************************************************************/





document.addEventListener('DomContentLoaded',postData());
document.addEventListener('DomContentLoaded',getData());



	
	

	
function postData(){
	console.log("post data started");
	document.getElementById('frmSubmit').addEventListener('click', function(event){
	event.preventDefault();	
	console.log("post data continued");
	
//adapted from https://stackoverflow.com/questions/9561625/checking-value-of-radio-button-group-via-javascript
	var unit = document.getElementsByName("unit");
    var selectedUnit;

	for(var i = 0; i < unit.length; i++) {
    if(unit[i].checked)
       selectedUnit = unit[i].value;
 }
 var lbs;
 if (selectedUnit=="lbs")
 {
	 console.log("LBS");
	lbs = 1;
 }
 else
 {	
lbs = 0;
	}

	
	var sendData = '{"name":"' + document.getElementById('exName').value +'","reps":"' + document.getElementById('reps').value +'","weight":"'+ document.getElementById('weight').value +'"';
	sendData = sendData +',"date":"'+ document.getElementById('exDate').value+'","lbs":"'+ lbs +'"}';
	
	console.log("Yo " + sendData);
	var postReq = new XMLHttpRequest();
	postReq.open("POST", "http://flip2.engr.oregonstate.edu:28944/post", true);
	postReq.setRequestHeader('Content-Type', 'application/json');
	// adapted from code examples in http://eecs.oregonstate.edu/ecampus-video/CS290/core-content/ajax-forms/async-requests.html
	postReq.addEventListener('load', function(){
		if(postReq.status >= 200 && postReq.status < 400){
			getData();
			document.getElementById("newEntry").reset();
			//var response = JSON.parse(postReq.responseText);
			//document.getElementById('dataReturn').textContent = response.data;
		}
		else {
			  console.log("Error in network request: " +postReq.statusText);
	}});
	
	postReq.send(sendData);

	
	
})
}



function getData(){
	console.log("get data started");
	populateTable();
	
	
	document.getElementById('show').addEventListener('click', function(event){
	event.preventDefault();	
	console.log("get data continued");
	populateTable();
	
	})
	
	function populateTable(){
	var req = new XMLHttpRequest();
	req.open("GET", "http://flip2.engr.oregonstate.edu:28944/get", true);
	req.addEventListener('load', function(){
		if(req.status >= 200 && req.status < 400){
			var response = req.responseText;
			console.log(response);
			response=JSON.parse(response);
					
	if (document.contains(document.getElementById("results"))){
		document.getElementById("results").remove();
	}
	
	
	var tr;
	var tableAdd = document.createElement("table");
	tableAdd.style.border = '2px solid black';
	var myTable = document.body.appendChild(tableAdd);
	var header = myTable.createTHead();
	
	//adapted from https://stackoverflow.com/questions/33682483/adding-class-name-or-id-to-table-with-js
	myTable.setAttribute("id", "results");
	headRow = header.insertRow(0);
	 
	//adapted from https://www.aspsnippets.com/Articles/Insert-Header-Cell-TH-element-in-HTML-Table-using-JavaScript.aspx
		var headCell = document.createElement("TH");
		headCell.style.border ='1px solid black';
		headCell.innerHTML = "Name";
		headRow.appendChild(headCell);
		headCell = document.createElement("TH");
		headCell.style.border ='1px solid black';
		headCell.innerHTML = "Reps";
		headRow.appendChild(headCell);
		headCell = document.createElement("TH");
		headCell.style.border ='1px solid black';
		headCell.innerHTML = "Weight";
		headRow.appendChild(headCell);
		headCell = document.createElement("TH");
		headCell.style.border ='1px solid black';
		headCell.innerHTML = "Date";
		headRow.appendChild(headCell);
		headCell = document.createElement("TH");
		headCell.style.border ='1px solid black';
		headCell.innerHTML = "Unit";
		headRow.appendChild(headCell);
		headCell = document.createElement("TH");
		headCell.style.border ='1px solid black';
		headCell.innerHTML = "Edit";
		headRow.appendChild(headCell);
		headCell = document.createElement("TH");
		headCell.style.border ='1px solid black';
		headCell.innerHTML = "Delete";
		headRow.appendChild(headCell);
	

var addBody = document.createElement("tbody");
	var tbody = myTable.appendChild(addBody);
	console.log(response.length);
	for (var i = 0; i<response.length; i++)
	{
		var row = tbody.insertRow();
		for(var j = 0; j<7; j++){
		var cell = row.insertCell(j);
		cell.style.border ='1px solid black';
		}
		
	}
	
	
	for (var i = 0; i<response.length; i++)
	{
		
			
			var x = myTable.rows[i+1].cells;
			
			var date = response[i].date;
			date = date.substring(0,10);
			
			
			var lbs;
			if(innerHTML=response[i].lbs == true)
			{
				lbs = "lbs";
			}
			else{
				lbs = "kgs";
			}
			
		x[0].innerHTML=response[i].name;		
		x[1].innerHTML=response[i].reps;		
		x[2].innerHTML=response[i].weight;	
		x[3].innerHTML=date;
		x[4].innerHTML=lbs;
		x[5].innerHTML= '<form> <input type="hidden" value="'+response[i].id+'"> <input type="submit" value="Edit" name="edit" id="edit'+[i]+'"></form>';
		x[6].innerHTML='<form> <input type="hidden" value="'+response[i].id+'"> <input type="submit" value="Delete" name="delete" id="delete'+[i]+'"></form>';
		
			

		
	}
			
				editRow();
		deleteRow();
			
		}
	 else {
			  console.log("Error in network request: " +req.statusText);
	}});
	req.send(null);
	};
	

	
}

function deleteRow(){
	console.log("delete started");
	var delButtons= document.getElementsByName("delete");
	console.log("there are delete " + delButtons.length);
	
	for(var i=0; i< delButtons.length; i++){
		delButtons[i].addEventListener('click', function(event){
	event.preventDefault();
	var id = this.previousElementSibling.value;
	
	console.log(id);
		
	var delReq = new XMLHttpRequest();
	delReq.open("DELETE", "http://flip2.engr.oregonstate.edu:28944/", true);
	delReq.setRequestHeader('Content-Type', 'application/json');
	// adapted from code examples in http://eecs.oregonstate.edu/ecampus-video/CS290/core-content/ajax-forms/async-requests.html
	delReq.addEventListener('load', function(){
		if(delReq.status >= 200 && delReq.status < 400){
			getData();
		}
		else {
			  console.log("Error in network request: " +delReq.statusText);
	}});
	
	delReq.send('{"id":"'+id+'"}');	
	
		

	});
	}
}

function editRow(){
	console.log("edit started");
	var editButtons= document.getElementsByName("edit");
	console.log("there are edit" + editButtons.length);
	
	var editForm = document.getElementById("editEntry"); 
	
	for(var i=0; i< editButtons.length; i++){
		var eleID= "edit"+i;
		editButtons[i].addEventListener('click', function(event){
	event.preventDefault();	
	var id = this.previousElementSibling.value;
	
	console.log(id);
	
	var delReq = new XMLHttpRequest();
	delReq.open("GET", "http://flip2.engr.oregonstate.edu:28944/getEntry", true);
	delReq.setRequestHeader('Content-Type', 'application/json');
	// adapted from code examples in http://eecs.oregonstate.edu/ecampus-video/CS290/core-content/ajax-forms/async-requests.html
	delReq.addEventListener('load', function(){
		if(delReq.status >= 200 && delReq.status < 400){
		 //response=JSON.parse(response);
			//editForm.editName.value=response.name;
			//editForm.editReps.value=response.reps;
			//editForm.editWeight.value=response.weight;
			//editForm.editDate.value=response.date;
			//editForm.editLbs.value=response.lbs;
			//editForm.editKg.value=response.kg;
		}
		else {
			  console.log("Error in network request: " +delReq.statusText);
	}});
	var idStr = '{"id":"'+id+'"}';
	console.log(idStr);
	
	delReq.send(idStr);	
	
	
	

	
	
	editForm.style.display = "block";
		
	
	
	document.getElementById('editSubmit').addEventListener('click', function(event){
	
	event.preventDefault();	
	
	
//adapted from https://stackoverflow.com/questions/9561625/checking-value-of-radio-button-group-via-javascript
	var unit = document.getElementsByName("editunit");
    var selectedUnit;

	for(var i = 0; i < unit.length; i++) {
    if(unit[i].checked)
       selectedUnit = unit[i].value;
 }
 var lbs;
 if (selectedUnit=="lbs")
 {
	 console.log("LBS");
	lbs = 1;
 }
 else
 {	
lbs = 0;
	}

	
	var sendData = '{"name":"' + document.getElementById('editName').value +'","reps":"' + document.getElementById('editReps').value +'","weight":"'+ document.getElementById('editWeight').value +'"';
	sendData = sendData +',"editDate":"'+ document.getElementById('editDate').value+'","lbs":"'+ lbs +'","id":"'+id+'"}';
	
	var postReq = new XMLHttpRequest();
	postReq.open("PUT", "http://flip2.engr.oregonstate.edu:28944/", true);
	postReq.setRequestHeader('Content-Type', 'application/json');
	// adapted from code examples in http://eecs.oregonstate.edu/ecampus-video/CS290/core-content/ajax-forms/async-requests.html
	postReq.addEventListener('load', function(){
		if(postReq.status >= 200 && postReq.status < 400){
			getData();
			document.getElementById("editEntry").reset();
			editForm.style.display = "none";
			//var response = JSON.parse(postReq.responseText);
			//document.getElementById('dataReturn').textContent = response.data;
		}
		else {
			  console.log("Error in network request: " +postReq.statusText);
	}});
	
	postReq.send(sendData);

	
	
})
	
	
	
	

	
	
	
		

	});
}
}
