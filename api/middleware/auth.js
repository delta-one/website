const db = require('../models/');
const util = require('../util/util.js');
const env = require('dotenv');
const jwt = require('jsonwebtoken');

module.exports.tvcrew_auth = async (req, res, next) => {
	if (!req.header('Authorization')) {
		res.status(400).send();
		return;
	}

	try {
		// load .env variables
		env.config();

		const token = req.header('Authorization').replace('Bearer ', '');
		const data = jwt.verify(token, process.env.JWT_KEY);

		const user = await db.Auth.findOne({
			where: { token: token },
		});

		if (!user) {
			res.status(403).send();
			return;
		}

		if (data.usertype !== 1 && data.usertype !== 2) {
			res.status(403).send();
			return;
		}

		next();
	} catch(err) {
		util.error(req, res, err);
	}
};
