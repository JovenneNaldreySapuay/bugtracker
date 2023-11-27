module.exports = {
	mongoDB: process.env.MONGO_URL,
	jwtSecret: process.env.JWT_SECRET,
	sendGridKey: process.env.SENDGRID_KEY,
	host: process.env.HOST,
	emailHost: process.env.EMAIL_HOST,
	emailPort: process.env.EMAIL_PORT,
	emailUser: process.env.EMAIL_USER,
	emailPass: process.env.EMAIL_PASS 
};