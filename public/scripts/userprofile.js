$(document).ready(function(){

	$('#changeEmailButton').click(function(){
		var submitButton = $('#submitEmailButton')
		submitButton.removeClass('hidden').addClass('show');
		$(this).addClass('invisible');
		var changeEmail = $('#changeEmail')
		
		// Save the old e-mail address
		var oldEmail = changeEmail.children("p").text();
		console.log(oldEmail);
		
		
		var getNewEmail = $('<input>').attr('type','text').attr('name','email').attr('id','email').attr('placeholder',oldEmail).addClass('form-control');
		
		console.log(getNewEmail);
		changeEmail.html(getNewEmail);
		
		return false;
	});
	
});