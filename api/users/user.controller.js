const { create, getUsers, getUserById, getUserByEmail, updateUser, deleteUser } = require('./user.services');
const { hashSync, genSaltSync, compareSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

module.exports = {
	createUser: (req, res) => {
		const body = req.body;
		console.log(body);
		const salt = genSaltSync(10);
		body.password = hashSync(body.password, salt);
		create (body, (err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({
					success: 0,
					message: "Database Connection error"
				});
			}
			return res.status(200).json({
				success: 1,
				data: results
			});
		});
	},
	getUsers: (req, res) => {
		getUsers((err, results) => {
			if (err) {
				console.log(err);
				return;
			}
			return res.json({
				success: 1,
				data: results
			});
		});
	},
	getUserById: (req, res) => {
		const id = req.params.id;
		getUserById(id, (err, results) => {
			if (err) {
				console.log(err);
				return;
			}
			if (!results) {
				return res.json({
					success: 0,
					message: "User Not Found"
				});
			}
			return res.json({
				success: 1,
				data: results
			});
		});
	},
	updateUser: (req, res) => {
		const body = req.body;
		const salt = genSaltSync(10);
		body.password = hashSync(body.password, salt);
		updateUser (body, (err, results) => {
			if (err) {
				console.log(err);
				return;
			}
			if (!results) {
				return res.json({
					success: 0,
					message: "Update was unsuccessful"
				})
			}
			return res.json({
				success: 1,
				message: "Updated successfully" 
			});
		});
	},
	deleteUser: (req, res) => {
		const data = req.body;
		deleteUser(data, (err, results) => {
			if (err) {
				console.log(err);
				return;
			}
			if (!results) {
				return res.json({
					success: 0,
					message: "Record Not Found"
				});
			}
			return res.json({
				success: 1,
				message: "User deleted successfully"
			});
		});
	},
	login: (req, res) => {
		const body = req.body;
		getUserByEmail(body.email, (err, results) => {
			if (err) {
				console.log(err);
				return;
			}
			if (!results) {
				return res.json({
					success: 0,
					message: "Invalid email or password"
				});
			}
			const result = compareSync(body.password, results.password);
			if (result) {
				results.password = undefined;
				const jsontoken = sign({ result: results }, process.env.TOKEN, {
					expiresIn: "1h"
				});
				return res.json({
					success: 1,
					message: "login successful",
					token: jsontoken
				});
			} else {
				return res.json({
					success: 0,
					data: "Invalid email or password"
				});
			}
		});
	}	
}