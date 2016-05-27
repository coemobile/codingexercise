// adding some dependencies and variables
var express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb');
var app = express(),
    ObjectId = mongodb.ObjectId;

// make express use body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// initializing some variables for the database connection
var MongoClient = mongodb.MongoClient;
var collection_name = 'tasks';
var url = 'mongodb://localhost:27017/' + collection_name;

// respond to specific post requests (fetch, add, remove, edit)
app.post('/fetch', function (req, res) {
	// connecting to the database
	MongoClient.connect(url, function(err, db) {
		if(!err) {
			// specifying the collection
			var collection = db.collection(collection_name);
			// doing the find operation and responding to the request
			collection.find({}).toArray(function(err, result) {
				if(!err) {
					var response = {status:'success', data:result};
					res.send(JSON.stringify(response));
				} else {
					var response = {status:'could not fetch data or empty collection'};
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
	if(req.body.value) {
		// connecting to the database
		MongoClient.connect(url, function(err, db) {
			if(!err) {
				// specifying the collection
				var collection = db.collection(collection_name);
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
	} else {
		var response = {status:'empty value'};
		res.send(JSON.stringify(response));
	}
});
app.post('/remove', function (req, res) {
	// connecting to the database
	MongoClient.connect(url, function(err, db) {
		if(!err) {
			// specifying the collection
			var collection = db.collection(collection_name);
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
	if(req.body.id) {
		// connecting to the database
		MongoClient.connect(url, function(err, db) {
			if(!err) {
				// specifying the collection
				var collection = db.collection(collection_name);
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
	} else {
		var response = {status:'empty value'};
		res.send(JSON.stringify(response));
	}
});

// for all other requests, serve the file from the public folder
app.use(express.static('public/'));

// listen to port 8080
app.listen(8080, function() {
	console.log('listening to 8080');
});
