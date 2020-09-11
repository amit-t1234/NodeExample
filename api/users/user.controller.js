const { create, getUsers, getUserById, updateUser, deleteUser } = require('./user.services');
const { hashSync, genSaltSync } = require('bcryptjs');

module.exports = {
	createUser: (req, res) => {
		const body = req.body;
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
	}	
}