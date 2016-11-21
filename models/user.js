var mongoose = 	require("mongoose");

var Schema = mongoose.Schema;

// User schema
var userSchema = new Schema({
	username: {type: String,
						 minlength: 3,
						 maxlength: 16,
						 unique: true,
						 index: true
						},
	battleTag: {type: String,
						 validate: [/[a-zA-Z][a-zA-Z0-9]{2,11}/, 'Battletags are 3-12 characters long and must start with a letter.']},
	battleTagID: {type: Number,
							  validate: [/[0-9]{4,6}/,'Battletag Identifiers should be 4-6 numbers.']},					  
	email: {type: String,
				  validate: [/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i, 'Please enter a valid e-mail']},
	hashedPassword: String
}, {collection: 'users'});

//set our schema to have a unique battleTag and battleTagID combination
userSchema.index({battleTag:1, battleTagID:1}, {unique:true});

var User = mongoose.model('user', userSchema);

module.exports = { User: User }