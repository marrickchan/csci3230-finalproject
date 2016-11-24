$(document).ready(function(){

	$('#changeEmailButton').click(function(){
		var submitButton = $('#submitEmailButton')
		var cancelButton = $('#cancelEmailButton')
		showButtons(submitButton, cancelButton);
		var changeEmail = $('#changeEmail')
		
		// Save the old e-mail address, in case they don't enter anything
		var oldEmail = changeEmail.children("p").text();
		
		// Add an input box to get the new address
		// Attach a hidden input to save the old e-mail address to pass on when post-ed
		var getNewEmailTag = $('<input>').attr('type','email').attr('name','email').attr('id','email').attr('placeholder',oldEmail).addClass('form-control');
		var oldEmailTag = $('<input>').attr('type','hidden').attr('name','oldEmail').attr('id','oldEmail').attr('value', oldEmail);
		changeEmail.html(getNewEmailTag);
		changeEmail.append(oldEmailTag);
		
		// Set the click handler for the Cancel button
		$('#cancelEmailButton').click(function(){
			var cancelEmail = $('<p>').text(oldEmail);
			changeEmail.html(cancelEmail);
			hideButtons(submitButton,cancelButton);
			return false;
		});
		
		return false;
	});

	$('#changeBattleTagButton').click(function(){
		var submitButton = $('#submitBattleTagButton');
		var cancelButton = $('#cancelBattleTagButton');
		showButtons(submitButton, cancelButton);
		var changeBattleTag = $('#changeBattleTag')
		
		// Save the old BattleTag for cancel purposes only
		// If they enter nothing that's ok, since a battle tag is optional
		
		var oldBattleTag = changeBattleTag.children("p").text();
		console.log(oldBattleTag);
		
		var getNewBattleTag = $('<input>').attr('type','text')
																			.attr('name','battleTag')
																			.attr('id','battleTag')
																			.addClass('form-control');
		
		var getNewBattleTagID = $('<input>').attr('type','text')
																			.attr('name','battleTagID')
																			.attr('id','battleTagID')
																			.addClass('form-control')
																			.addClass('col-md-1');
		
		var battleTagNumberSign = $('<span>').addClass('input-group-addon').text('#');
		
		console.log(getNewBattleTag);
		changeBattleTag.addClass('input-group');
		changeBattleTag.html(getNewBattleTag);
		changeBattleTag.append(battleTagNumberSign);
		changeBattleTag.append(getNewBattleTagID);
		
		// Set the click handler for the Cancel button
		$('#cancelBattleTagButton').click(function(){
			var cancelBattleTag = $('<p>').text(oldBattleTag);
			changeBattleTag.html(cancelBattleTag);
			hideButtons(submitButton,cancelButton);
			return false;
		});
		
		return false;
	});
	
	$('#changePasswordButton').click(function(){
		var submitButton = $('#submitPasswordButton');
		var cancelButton = $('#cancelPasswordButton');
		showButtons(submitButton, cancelButton);		
		var changePassword = $('#changePassword')

		var getNewPassword = $('<input>').attr('type','password')
																		 .attr('name','password')
																		 .attr('id','password')
																		 .addClass('form-control');
		
		changePassword.html(getNewPassword);
		
		$('#cancelPasswordButton').click(function(){
			var cancelPassword = $('<p>').text("********");
			changePassword.html(cancelPassword);
			hideButtons(submitButton,cancelButton);
			return false;
		});
		
		return false;
	});

});


// This function takes in two Buttons, and will show those two buttons, and turn off all the change buttons
function showButtons(submitButton, cancelButton){
	submitButton.removeClass('hidden').addClass('show');
	cancelButton.removeClass('hidden').addClass('show');
	$('#changeEmailButton').addClass('invisible');
	$('#changeBattleTagButton').addClass('invisible');
	$('#changePasswordButton').addClass('invisible');
}


//This function takes in two Buttons, will hide them, and turn all the change buttons back on
function hideButtons(submitButton, cancelButton){
	submitButton.removeClass('show').addClass('hidden');
	cancelButton.removeClass('show').addClass('hidden');
	$('#changeEmailButton').removeClass('invisible');
	$('#changeBattleTagButton').removeClass('invisible');
	$('#changePasswordButton').removeClass('invisible');
}