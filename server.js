const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

db_collection_name = 'tasks'
const db_url = 'mongodb://localhost:27017/todolist';

app.post('/add', function(req, res) {
	MongoClient.connect(db_url, function(err,db) {
		if (err) return console.log(err);

		db.collection(db_collection_name).save(req.body, function(err, result) {
	  	if (err) return console.log(err);

	  	console.log('saved to database');
	  	res.redirect('/');
	  	});
	});
});

app.get('/', function(req, res) {
	MongoClient.connect(db_url, function(err,db) {
		if (err) return console.log(err);

		db.collection(db_collection_name).find().toArray(function(err, result) {
			res.render('index.ejs', {tasks: result});
		});
		
	});

});

app.use(express.static(__dirname + '/public'));



var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
	console.log('Listening on port ' + PORT);
});