const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating a new schema
const userSchema = new Schema({
	name: String,
	email: String,
	username: String,
	password: String,
	confpassword: String	
});

const user = mongoose.model('user', userSchema);

//exporting the created schema
module.exports = user