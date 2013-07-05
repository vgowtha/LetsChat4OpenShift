document
		.write('<script type="text/javascript" src="http://53.90.231.57:8080/ChatWithMe/ListUtility.js"></script>');
var user_name;
function callback(txt) {
	if (txt !== "" && txt !== "\n") {
		var str_users = txt.split("\n");
		if ("null" != str_users[0]) {
			for ( var index = 0; index < str_users.length - 1; index++) {
				if (!optionExists(str_users[index], 'users')) {		
					appendOptionLast(str_users[index], 'users');					
				}
			}
		} else {
			alert("User list is empty....");
		}
	} else {		
		clearValueInElt('users');
	}
}
function callbackMessages(response_messages) {
	document.getElementById("msg_board").value = response_messages;	
}
function whoryou() {
	document.getElementById("user_hidden").value = prompt(
			"Please enter your name", "user_name");
	user_name = (document.getElementById("user_hidden").value);
	if ((null != user_name) && ("null" != user_name) && (user_name.length > 0)) {
		hitUrl("http://53.90.231.57:8080/ChatWithMe/nowhere.go?operation=addUser&param1="
				+ user_name);
	} else {
		alert("Enter a valid user name");
	}
}
function checkAvailableUsers() {
	setInterval(
			function populateCurrentUsers() {
				hitUrl(
						"http://53.90.231.57:8080/ChatWithMe/nowhere.go?operation=getUsers",
						callback);
			}, 1000);
}
function checkMessages() {	
	setInterval(function populateMessages() {
		hitUrl(
				"http://53.90.231.57:8080/ChatWithMe/nowhere.go?operation=getMessage&param1="
						+ user_name, callbackMessages);
	}, 1000);
}
function sendMessage() {	
	if ((document.getElementById("users").options.selectedIndex) < 0)
		alert("Select the person who u wanna ping");
	if ((document.getElementById("msg").value) == "")
		alert("Enter the message you wanna send");
	hitUrl("http://53.90.231.57:8080/ChatWithMe/nowhere.go?operation=sendMessage&param1="
			+ document.getElementById("user_hidden").value
			+ "&param2="
			+ document.getElementById("users").options[document
					.getElementById("users").options.selectedIndex].text
			+ "&param3=" + document.getElementById("msg").value);
}
function hitUrl(url, callback) {	
	var xmlhttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			// document.getElementById("myDiv").innerHTML =
			// xmlhttp.responseText;
			if (callback) {
				var response = xmlhttp.responseText;
				callback(response);
				response = "";
			}

		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}
function logout() {
	if (isRemovePossible('users',
			(document.getElementById("user_hidden").value))) {
		//alert("isRemovePossible true");
		hitUrl("http://53.90.231.57:8080/ChatWithMe/nowhere.go?operation=logout&param1="
				+ (document.getElementById("user_hidden").value));
		removeOptionSelected('users',
				(document.getElementById("user_hidden").value));
	}
}
function searchKeyPress(e) {
	// look for window.event in case event isn't passed in
	if (typeof e == 'undefined' && window.event) {
		e = window.event;
	}
	if (e.keyCode == 13) {
		document.getElementById('send').click();
		//sendMessage();
		return false;//avoids form reload.This has to be returned in html as well.
	}
}