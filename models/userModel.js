const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	about_us: { type: String, required: true },
})
const usersTable = mongoose.model("users", userSchema)
module.exports = usersTable 