const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const user = require('./models/user');
const url = 'mongodb://localhost/bcrypt';

// setting view engine
app.set('view engine', 'ejs');

//requiring js, bootstrap, and css module from node_module
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(bodyparser.urlencoded({extended: true}));

//connecting to mongodb 
mongoose.connect(url, function (err, db) {
	if (err) {
		console.log('error');
	} else {
		console.log('connected');
	}
});

app.get('/', function (req, res) {
	res.render('index');
});

app.post('/register', function (req, res) {
	bcrypt.hash(req.body.password, 15, function (err, hash) {
		if (err) {
			console.log('error');
		} else {
			details = user({
				name: req.body.name,
				email: req.body.email,
				username: req.body.username,
				password: hash,
				confpassword: hash
			});
			details.save(function (err, result) {
				if (err) {
					throw err
				} else {
					res.render('login', {
						msg: result.username +  ' You have successfully registered your account. use to form below to login to your Dashboard'
					});
				}
			});
		}
	});
});

app.get('/login', function (req, res) {
	res.render('login');
});

app.post('/login', function (req, res) {
	const enteredPassword = req.body.password

	user.findOne({email: req.body.email}).then(function (found) {
		if (!found) {
			console.log('Not-found');
		} else {
			bcrypt.compare(enteredPassword, found.get('password'), function (err, result) {
				if (result) {
					console.log('correct');
				} else {
					console.log('Not-found');
				}
			});
		}
	});
		
	});

app.listen(3000, function () {
	console.log('now listening to port 3000');
});