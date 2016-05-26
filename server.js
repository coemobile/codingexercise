// adding some dependencies
var express 	= require('express');
	bodyParser 	= require('body-parser');
	app 		= express();

// make express use body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// respond to specific post requests
app.post('/fetch', function (req, res) {
	res.send(JSON.stringify({status:'success', data:[{id:1, desc:'event1'}, {id:2, desc:'event2'}, {id:3, desc:'event3'}]}));
});
app.post('/add', function (req, res) {
	console.log('adding :')
	console.log(req.body);
	res.send(JSON.stringify({status:'success', id:4}));
});
app.post('/remove', function (req, res) {
	console.log('removing :')
	console.log(req.body);
	res.send(JSON.stringify({status:'success'}));
});
app.post('/edit', function (req, res) {
	console.log('edited :')
	console.log(req.body);
	res.send(JSON.stringify({status:'success'}));
});

// for all other requests, serve the file from the public folder
app.use(express.static('public/'));

// listen to port 8080
app.listen(8080, function() {
	console.log('listening to 8080');
});
