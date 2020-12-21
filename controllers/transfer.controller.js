var { nanoid } = require('nanoid');

var db = require('../db');

module.exports.create = function(req, res, next){
	res.render('transfer/create', {
		csrfToken: req.csrfToken()
	});
};

module.exports.postCreate = function(req, res, next){
	var data = {
		id: nanoid(),
		accountId: req.body.accountId,
		amount: parseInt(req.body.amount),
		userId: req.signedCookies.userId
	};
	db.get('transfers').push(data).write();

	res.redirect('/transfer/create');
};