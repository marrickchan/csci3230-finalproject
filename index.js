// Express + body-parser
var express = require('express');
var app = express();
var session = require('express-session');
var uuid = require('node-uuid');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Middleware
// Body Parser
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(express.static('public'));

// Setup sessions
app.use(session({
	genid: function(request){
		return uuid.v4();
	},
	resave: false,
	saveUninitialized: false,
	secret: 'counter strike global offensive'
}));

// View engine
// Views directory, pug files
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// Database Connection
mongoose.connect('localhost:27017/diabloUsers');

// Get the User schema
var User = require("./models/user.js").User;

// Helper functions

function getUsername(request){
	var username = '';
	var session = request.session;
	if (session.username){
		username = session.username;
	}
	return username;
}

function getProfilePromise(username){
	var promise = User.find({username:username}).exec();
	return promise;
}

// Routing
app.get(['/', '/index'], function(request,response){
	response.render('index', {username: getUsername(request)});
});

app.get('/difficultyoverview', function(request,response){
	response.render('difficultyoverview', {username: getUsername(request)});
});

app.get('/classes', function(request,response){
	response.render('classes', {username: getUsername(request)});
});

app.get('/legendarygems', function(request,response){
	response.render('legendarygems', {username: getUsername(request)});
});

app.get('/leaderboards', function(request,response){
	response.render('leaderboards', {username: getUsername(request)});
});

app.get('/seasonstats', function(request,response){
	response.render('seasonstats', {username: getUsername(request)});
});

app.get('/register', function(request, response){
	response.render('register');
});

app.get('/login', function(request, response){
	response.render('login');
});

app.get('/profile', function(request, response){
	var username = getUsername(request);
	
	var promise = User.find({username:username}).exec();
	
	promise.then(function(results){
		email = results[0].email;
		battleTag = results[0].battleTag;
		battleTagID = results[0].battleTagID;
		if (results.length>0){
			response.render('profile', {username: username,
																	email: email,
																 	battleTag: battleTag,
																 	battleTagID:battleTagID});
		} else {
			response.render('profile');
		}	
	});
});

//processRegistration
app.post('/processRegistration', function(request, response){
	var username = request.body.username;
	var battleTag = request.body.battletag;
	var battleTagID = request.body.identifier;

	User.find({username:username}).then(function(results){
		if (results.length!=0){
			response.render('register', {errorMessage:'Error: Username already taken'});
		}
	});
	
	//TODO: check if the battletag is unique
	
	var session = request.session;
	session.username = username;
	session.save();
	
	// hash the password
	var password = request.body.password;
	var hash = bcrypt.hashSync(password);
	
	// save the new user in the database;
	var email = request.body.email;
	var newUser = new User({username: username,
												  battleTag: battleTag,
												  battleTagID: battleTagID,
												  email: email,
												  hashedPassword: hash});
	
	newUser.save(function(error) {
		if (error) {
			// registration failed
			response.render('register', {errorMessage:'Something went wrong!'});
		} else {
			// registration success
			response.render('index', {username: username});
		}
	});
});

app.post('/processLogin', function(request,response){
	var username = request.body.username;
	var password = request.body.password;
	
	User.find({username:username}).then(function(results){
		// Check if the user exists first
		if (results.length==0){
			response.render('login', {errorMessage: 'Error: Username not found!'});
		} else {
			// If username is found then check the password
			if (bcrypt.compareSync(password, results[0].hashedPassword)){
					var session = request.session;
					session.username = username;
					response.render('index', {username: username});
				}
				else{
					response.render('login', {errorMessage: 'Error: Password incorrect!'});
				}
		}
	});
});

app.post('/changeEmail', function(request, response){
	var session = request.session;
	var username = session.username;
	var email = request.body.email;
	var oldEmail = request.body.oldEmail;
	
	console.log(oldEmail);
	
	if (email==null || email===""){
		email = oldEmail;
	}
	
	// Get the username
	User.find({username:username}).then(function(results){
		if (results.length>0){
			// Update the user's e-mail
			User.update({username:username}, {email:email}, {multi: false}, function(error, numAffected){

				// Get the updated (or not) user info and go back to the profile page
				User.find({username:username}).then(function(results){
					email = results[0].email;
					battleTag = results[0].battleTag;
					battleTagID = results[0].battleTagID;
					response.render('profile', {username: username,
																	email: email,
																 	battleTag: battleTag,
																 	battleTagID:battleTagID});
				});
			});
		}	else {
			// Something went wrong finding the user
			response.render('profile', {username:''});
		}
	});
});

app.post('/changeBattleTag',function(request,response){
	var session = request.session;
	var username = session.username;
	var battleTag = request.body.battleTag;
	var battleTagID = request.body.battleTagID;
	
	User.find({username:username}).then(function(results){
		if (results.length>0){
			// Update the user's battleTag
			
			User.update({username:username},{battleTag:battleTag, battleTagID:battleTagID}, {multi:false}, function(error, numAffected){
				
				// Get the updated (or not) user info and go back to the profile page
				User.find({username:username}).then(function(results){
					email = results[0].email;
					battleTag = results[0].battleTag;
					battleTagID = results[0].battleTagID;
					response.render('profile', {username: username,
																			email: email,
																			battleTag: battleTag,
																			battleTagID:battleTagID});
				});
			
			});
		} else {
			//Something went wrong finding the user
			response.render('profile', {username:''});
		}
	});
});

app.post('/changePassword',function(request,response){
	var session = request.session;
	var username = session.username;
	var password = request.body.password;
	var hash = bcrypt.hashSync(password);
	
	User.find({username:username}).then(function(results){
		if(results.length>0){
			// Update the user's password
			
			User.update({username:username},{hashedPassword:hash},{multi:false}, function(error, numAffected){
				// Get the updated (or not) user info and go back to the profile page
				User.find({username:username}).then(function(results){
					email = results[0].email;
					battleTag = results[0].battleTag;
					battleTagID = results[0].battleTagID;
					response.render('profile', {username: username,
																			email: email,
																			battleTag: battleTag,
																			battleTagID:battleTagID});
				});
			});
		} else {
			//Something went wrong finding the user
			response.render('profile', {username:''});
		}
		
	});
});

app.get('/logout', function(request, response){
	request.session.username='';
	response.redirect('/index');	
});

// Run Listener
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});