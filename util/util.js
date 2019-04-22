const fs = require('fs');
const path = require('path');

// prints something to the console
// console.log clutters the test-output otherwise
function print(s) {
	if (process.env.NODE_ENV !== 'test')
		console.log(s);
}
module.exports.print = print;

// clear all session objects
function clearSessions() {
	const directory = 'sessions';

	fs.readdir(directory, (err, files) => {
	  if (err) throw err;

	  for (const file of files) {
	    fs.unlink(path.join(directory, file), err => {
	      if (err) throw err;
	    });
	  }
	});
}
module.exports.clearSessions = clearSessions;

// check, if a visitor is logged in
function isLoggedIn(req) {
	return req.session.user ? true : false;
}
module.exports.isLoggedIn = isLoggedIn;
