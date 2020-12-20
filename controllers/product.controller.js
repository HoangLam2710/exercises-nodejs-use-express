var db = require('../db');

module.exports.index = function(req, res){
	var database = db.get('products').value();

	var page = parseInt(req.query.page) || 1; // n
	var perPage = 12; // x

	var start = (page - 1) * perPage; // (n - 1)*x
	var end = page * perPage; // n * x

	var amountPage = (database.length % perPage !== 0) ? Math.floor((database.length / perPage)) + 1 : database.length / perPage;
	var prevPage = (page <= 1) ? 1 : page - 1;
	var nextPage = (page >= amountPage) ? amountPage : page + 1;

	res.render('products/index', {
		products: database.slice(start,end),
		page: page,
		amountPage: amountPage,
		prevPage: prevPage,
		nextPage: nextPage
	});
};