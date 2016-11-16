// Express + body-parser
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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

app.get('/seasonbests:username:', function(request,response){
	response.render('seasonbests');
});

// Run Listener
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});