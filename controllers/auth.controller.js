var md5 = require('md5');

// var db = require('../db');
var User = require('../models/user.model');

module.exports.login = function(req, res){
	res.render('auth/login', {
		csrfToken: req.csrfToken()
	});
};

module.exports.postLogin = async function(req, res){
	try{
		var email = req.body.email;
		var password = req.body.password;

		// var user = db.get('users').find({ email: email }).value();
		var users = await User.find();
		var temp;
		for (var user of users){
			if(user._doc.email == email){
				temp = user._doc;
				break;
			}		
		}

		if (!temp){
			res.render('auth/login', {
				errors: [
					'User does not exist.'
				],
				values: req.body
			});
			return;
		}

		var hashedPassword = md5(password);

		if (temp.password !== hashedPassword){
			res.render('auth/login', {
				errors: [
					'Wrong password.'
				],
				values: req.body
			});
			return;
		}

		res.cookie('userId', temp._id.toString(), {
			signed: true
		});
		
		res.redirect('/users');
	}
	catch(error){
		console.log(error);
	}
	
}