$(document).ready(function() {

	//APPLY INPUT MASKS - CONTACT FORM
	//==================================================================	
	$('#cPhone').mask("(99)9999-9999?9");
	//==================================================================		
	
	//POPULATE LIST
	//==================================================================
	$('.box-form').on('click', '#saveContact', function(event) {
		event.stopPropagation();

		var contacts = {};		
		var validateFields = function(){
			var fName = $('#cName');			
			var fPhone = $('#cPhone');
			var fEmail = $('#cEmail');
			
			var error = [];
			var idx = -1;
			
			if (!isLettersAlone(fName)) {
				idx++;
				error[idx] = "\n - " + fName.attr('data-error');
			}
			
			if (fPhone.val().length < 8) {
				idx++;
				error[idx] = "\n - " + fPhone.attr('data-error');
			}
			
			if (!isEmail(fEmail)) {
				idx++;
				error[idx] = "\n - " + fEmail.attr('data-error');
			}
			
			return error;
		};
		
		var disapprovedFields = validateFields();
		
		if(!disapprovedFields.length)
		{
			var newContact = {
				contact: {
					name: $('#cName').val(),
					phone: $('#cPhone').val(),
					email: $('#cEmail').val()
				}
			};
			
			contactListPopulate(newContact);
			
			$('.box-form form input').val("").empty();
		}
		else
		{
			var msgError = (disapprovedFields.length > 1) ? disapprovedFields.join() : disapprovedFields[0];
			alert(msgError);
		}
	});
	
	var contactListPopulate = function(newContact) {
		var allContacts = getCookie("contacts") ? JSON.parse( getCookie("contacts") ) : [];
				
		if(newContact)
		{
			allContacts.push( newContact );
			
			$(".contacts-list tbody").append(
				'<tr> <td>' + newContact.contact.name + '</td> <td>' + newContact.contact.phone + '</td> <td>' + newContact.contact.email + '</td> </tr>'
			);
		}
		else
		{
			for(var i = 0; i < allContacts.length; i++) {
				$(".contacts-list tbody").append(
					'<tr> <td>' + allContacts[i].contact.name + '</td> <td>' + allContacts[i].contact.phone + '</td> <td>' + allContacts[i].contact.email + '</td> </tr>'
				);
			}
		}
		
		setCookie("contacts", JSON.stringify(allContacts), 1);
	};
	
	contactListPopulate();	
	//==================================================================
});

function setCookie(cname, cvalue, exdays) {
	
	if (typeof(Storage) !== "undefined") {
		localStorage.setItem(cname, cvalue);
	} 
	else {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
}

function getCookie(cname) {
	if (typeof(Storage) !== "undefined") {
		return localStorage.getItem(cname);
	} 
	else {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
	}
	
    return "";
}

function deleteCookie(cname) {
	document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function isEmail(iptElement, showMsgError) {
    
	var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var oString = $(iptElement).val();
	
	if(oString.length > 7 && regex.test(oString))
	{
		return true;
	}
	else
	{
		if(showMsgError) {			
			$(iptElement).focus();
			$(iptElement).next('.msgError').text($(iptElement).attr('data-error'));
		}
		
		return false;
	}
}

function isLettersAlone(iptElement, showMsgError)
{
	var regex = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
	var oString = $(iptElement).val();
	
	if(oString.length > 2 && oString.match(regex))
	{
		return true;
	}
	else
	{
		if(showMsgError) {			
			$(iptElement).focus();
			$(iptElement).next('.msgError').text($(iptElement).attr('data-error'));
		}
		
		return false;
	}
}

function isPhoneNumber(iptElement, showMsgError)
{
	var regex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
	var oString = $(iptElement).val().replace('_','');
	
	if(oString.length > 7 && oString.match(regex))
	{
		return true;
	}
	else
	{
		if(showMsgError) {			
			$(iptElement).focus();
			$(iptElement).next('.msgError').text($(iptElement).attr('data-error'));
		}
		
		return false;
	}
}

function resetValidation(iptElement)
{
	$(iptElement).next('.msgError').text("");
}
