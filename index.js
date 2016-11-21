// Express + body-parser
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Middleware
// Body Parser
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(express.static('public'));

// View engine
// Views directory, pug files
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// Database Connection
mongoose.connect('localhost:27017/diabloUsers');

// Get the User schema
var User = require("./models/user.js").User;

// Routing
app.get(['/', '/index'], function(request,response){
	response.render('index');
});

app.get('/difficultyoverview', function(request,response){
	response.render('difficultyoverview');
});

app.get('/classes', function(request,response){
	response.render('classes');
});

app.get('/legendarygems', function(request,response){
	response.render('legendarygems');
});

app.get('/leaderboards', function(request,response){
	response.render('leaderboards');
});

app.get('/seasonstats', function(request,response){
	response.render('seasonstats');
});

app.get('/register', function(request, response){
	response.render('register');
});

//processRegistration
app.post('/processRegistration', function(request, response){
	var username = request.body.username;
	var battleTag = request.body.battletag;
	var battleTagID = request.body.identifier;
	
	console.log(username);
	console.log(battleTag);
	console.log(battleTagID);
	
	
	
	User.find({username:username}).then(function(results){
		if (results.length==0){
			response.render('register', {errorMessage:'Error: Username already taken'})
		}
	});
	
});

// Run Listener
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});