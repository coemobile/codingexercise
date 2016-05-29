const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

db_collection_name = 'tasks'
var ObjectId = require('mongodb').ObjectId;
const db_url = 'mongodb://localhost:27017/todolist';

app.post('/add', function(req, res) {
	MongoClient.connect(db_url, function(err,db) {
		if (err) return console.log(err);

		db.collection(db_collection_name).save(req.body, function(err, result) {
	  	if (err) return console.log(err);
	  		console.log(req.body);
	  		console.log('saved to database');
	  	});
	});
});

app.post('/delete', function(req, res) {
	MongoClient.connect(db_url, function(err,db) {
		if (err) return console.log(err);

		db.collection(db_collection_name).remove({'_id': ObjectId(req.body.id)}, function(err, result) {
	  	if (err) return console.log(err);
	  		console.log('deleted from database');
	  	});
	});
});

app.post('/edit', function(req, res) {
	MongoClient.connect(db_url, function(err,db) {
		if (err) return console.log(err);

		console.log(req.body);
		db.collection(db_collection_name).update({'_id':ObjectId(req.body.id)},{'$set':{"task":req.body.task}},{}, function(err, result) {
	  	if (err) return console.log(err);
	  		console.log('updated database');
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