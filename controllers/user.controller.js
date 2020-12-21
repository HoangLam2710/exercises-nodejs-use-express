var { nanoid } = require('nanoid');

var db = require('../db');

module.exports.index = function(req, res){
	res.render('users/index', {
		users: db.get('users').value()
	});
};

module.exports.search = function(req, res){
	var q = req.query.q;
	var matchUsers = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index', {
		users: matchUsers,
		q: q
	});
};

module.exports.create = function(req, res){
	res.render('users/create');
};

module.exports.get = function(req, res){
	var id = req.params.userId;
	var user = db.get('users').find({ id: id }).value();

	res.render('users/view', {
		user: user
	});
};

module.exports.postCreate = function(req, res){
	req.body.id = nanoid();
	req.body.avatar = req.file.path.split('\\').slice(1).join('/');

	db.get('users').push(req.body).write();
	res.redirect('/users');
};