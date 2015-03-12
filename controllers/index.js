var env = process.env.NODE_ENV || 'production',
	config = require('../config')[env];

//var mongoose = require('mongoose'),
//	User = mongoose.model('User');

module.exports.index = function(req, res) {
  res.render('../views/index.html');
}
 