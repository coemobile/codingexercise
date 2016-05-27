// adding some dependencies and variables
var express 	= require('express'),
	bodyParser 	= require('body-parser'),
	mongodb		= require('mongodb');
var app 		= express(),
	ObjectId	= mongodb.ObjectId;

// make express use body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/tasks';

// respond to specific post requests (fetch, add, remove, edit)
app.post('/fetch', function (req, res) {
	// connecting to the database
	MongoClient.connect(url, function(err, db) {
		if(!err) {
			// specifying the collection
			var collection = db.collection('tasks');
			// doing the find operation and responding to the request
			collection.find({}).toArray(function(err, result) {
				if(result.length && !err) {
					var response = {status:'success', data:result};
					res.send(JSON.stringify(response));
				} else {
					var response = {status:'could not fetch data'};
					res.send(JSON.stringify(response));
				}
				db.close();
			});
		} else {
			var response = {status:'could not connect to database'};
			res.send(JSON.stringify(response));
		}
	});
});
app.post('/add', function (req, res) {
	// connecting to the database
	MongoClient.connect(url, function(err, db) {
		if(!err) {
			// specifying the collection
			var collection = db.collection('tasks');
			// doing the insert operation and responding to the request
			collection.insert([{desc:req.body.value}], function(err, result) {
				if(!err) {
					var response = {status:'success', id:result.insertedIds[0]};
					res.send(JSON.stringify(response));
				} else {
					var response = {status:'could not insert into database'};
					res.send(JSON.stringify(response));
				}
            	db.close();
			});
		} else {
			var response = {status:'could not connect to database'};
			res.send(JSON.stringify(response));
		}
	});
});
app.post('/remove', function (req, res) {
	// connecting to the database
	MongoClient.connect(url, function(err, db) {
		if(!err) {
			// specifying the collection
			var collection = db.collection('tasks');
			// doing the remove operation and responding to the request
			collection.remove({'_id':ObjectId(req.body.id)}, function(err, result) {
				if(!err) {
					var response = {status:'success'};
					res.send(JSON.stringify(response));
				} else {
					var response = {status:'could not remove from database'};
					res.send(JSON.stringify(response));
				}
            	db.close();
			});
		} else {
			var response = {status:'could not connect to database'};
			res.send(JSON.stringify(response));
		}
	});
});
app.post('/edit', function (req, res) {
	// connecting to the database
	MongoClient.connect(url, function(err, db) {
		if(!err) {
			// specifying the collection
			var collection = db.collection('tasks');
			// doing the update operation and responding to the request
			collection.update({'_id':ObjectId(req.body.id)},{'$set':{"desc":req.body.value}},{}, function(err, result) {
				if(!err) {
					var response = {status:'success'};
					res.send(JSON.stringify(response));
				} else {
					var response = {status:'could not edit from database'};
					res.send(JSON.stringify(response));
				}
            	db.close();
			});
		} else {
			var response = {status:'could not connect to database'};
			res.send(JSON.stringify(response));
		}
	});
});

// for all other requests, serve the file from the public folder
app.use(express.static('public/'));

// listen to port 8080
app.listen(8080, function() {
	console.log('listening to 8080');
});
