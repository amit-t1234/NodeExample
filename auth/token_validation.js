const { verify } = require('jsonwebtoken');
const { logger } = require('../config/logger');

module.exports = {
	checkToken: (req, res, next) => {
		let token = req.get('authorization');
		if (token) {
			token = token.slice(7);
			verify(token, process.env.TOKEN, (err, decoded) => {
				logger.error(err);
				if (err) {
					return res.json({
						success: 0,
						message: "Invalid token"
					});
				}
				next();
			});
		} else {
			logger.error("Access denied! Unauthorized User");
			return res.json({
				success: 0,
				message: "Access denied! Unauthorized User"
			});
		}
	}
}