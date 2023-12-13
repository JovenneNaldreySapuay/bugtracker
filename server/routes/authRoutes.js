const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

// const sendResetPasswordEmail = require('../mailer-reset');
// const keys = require('../config/keys');
// const parseErrors = require('../utils/parseErrors');

// USER MODEL
const User = mongoose.model('User'); 

module.exports = app => {

	// TODO: Research how to display HTTP errors into frontend
	app.post('http://localhost:5000/api/auth', async (req, res) => {
		
		const { credentials } = req.body;

		// console.log("User Logged details:", credentials );

		// await User.findOne({ email: credentials.email }).then(user => {
		await User.findOne({ email: credentials.email }).then(user => {
			
			console.log("authRoutes.js user:", user);

			// if (user /*&& user.isValidPassword(credentials.password)*/) {
			// 	res.json({ user: user.toAuthJSON() });
			// } else {
			// 	res.status(400).json({ errors: { global: "There was a problem with your login." } });
			// }
		});		
	});

	// app.post('/api/auth/confirmation', async(req, res) => {
	// 	const token = req.body.token;
	// 	await User.findOneAndUpdate(
	// 		{ confirmationToken: token }, 
	// 		{ confirmationToken: "", confirmed: true },
	// 		{ new: true }
	// 	).then(user => 
	// 		user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
	// 	);	
	// });

	// app.post('/api/auth/reset_password_request', async(req, res) => {
	// 	User.findOne({ email: req.body.email }).then(user => {
	// 		if (user) {
	// 			sendResetPasswordEmail(user);
	// 			res.json({});
	// 		} else {
	// 			res.status(400).json({ errors: { global: "There is no user with such email." } });
	// 		}
	// 	})
	// });

	// app.post('/api/auth/validate_token', async(req, res) => {
	// 	jwt.verify(req.body.token, keys.jwtSecret, err => {
	// 		if (err) {
	// 			res.status(401).json({});
	// 		} else {
	// 			res.json({});
	// 		}
	// 	})
	// });

	// app.post('/api/auth/reset_password', async(req, res) => {
	// 	const { password, token } = req.body.data;
	// 	console.log("REQ Data:", req.body.data);
		
	// 	jwt.verify(token, keys.jwtSecret, (err, decoded) => {	
	// 		console.log("DECODED TOKEN:", decoded);
			
	// 		if (err) {
	// 			res.status(401).json({ errors: { global: "Invalid token" } })
	// 		} else {
	// 			User.findOne({ _id: decoded._id }).then(user => {
	// 				if (user) {
	// 					console.log("Verified");
	// 					user.setPassword(password);
	// 					user.save().then(() => res.json({}));
	// 				} else {
	// 					res.status(404).json({ errors: { global: "Invalid token - HERE" } })
	// 				}
	// 			});
	// 		}
	// 	});
	// });

};

