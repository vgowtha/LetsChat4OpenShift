var count1 = 0;
var count2 = 0;
function insertOptionBefore(user, selectX) {
	var elSel = document.getElementById(selectX);
	if (elSel.selectedIndex >= 0) {
		var elOptNew = document.createElement('option');
		elOptNew.text = user;
		elOptNew.value = user;
		var elOptOld = elSel.options[elSel.selectedIndex];
		try {
			elSel.add(elOptNew, elOptOld); // standards compliant; doesn't work in IE
		} catch (ex) {
			elSel.add(elOptNew, elSel.selectedIndex); // IE only
		}
	}
}
function removeOptionSelected(selectX, loggedin_user) {
	var elSel = document.getElementById(selectX);
	var i;
	var hasSelected = false;
	for (i = elSel.length - 1; i >= 0; i--) {
		if (elSel.options[i].selected) {
			hasSelected = true;
			if (elSel.options[i].text === loggedin_user){
				elSel.remove(i);
				return true;
			}				
			else{
				alert(loggedin_user
						+ "does not have permission for this operation");
				return false;
			}				
		}
	}
	if(!hasSelected){
		 alert("Select user");		
	}
}
function isRemovePossible(selectX, loggedin_user) {	
	var elSel = document.getElementById(selectX);
	var i;
	var hasSelected = false;
	for (i = elSel.length - 1; i >= 0; i--) {
		if (elSel.options[i].selected) {
			hasSelected = true;
			if (elSel.options[i].text === loggedin_user) {				
				return true;
			} else {
				alert(loggedin_user
						+ "does not have permission for this operation");
				return false;
			}
		} 
	}
	if(!hasSelected){
	 alert("Select user");		
	}
}
function appendOptionLast(user, selectX) {
	var elOptNew = document.createElement('option');
	elOptNew.text = user;
	elOptNew.value = user;
	var elSel = document.getElementById(selectX);
	try {
		elSel.add(elOptNew, null); // standards compliant; doesn't work in IE
	} catch (ex) {
		elSel.add(elOptNew); // IE only
	}
}
function removeOptionLast(selectX) {
	var elSel = document.getElementById(selectX);
	if (elSel.length > 0) {
		elSel.remove(elSel.length - 1);
	}
}
/**
 * Return if a particular option exists in a <select> object
 * @param {String} needle A string representing the option you are looking for
 * @param {Object} haystack A Select object
 */
function optionExists(needle, selectX) {
	var optionExist = false, haystack = document.getElementById(selectX), optionsLength = haystack.length;
	while (optionsLength--) {
		if (haystack.options[optionsLength].value === needle) {
			optionExist = true;
			break;
		}
	}
	return optionExist;
}
function clearValueInElt(id) {
	document.getElementById(id).innerHTML = "";
}