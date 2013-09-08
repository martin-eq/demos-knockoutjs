var express = require('express'),
	fs = require('fs');

var app = express();

app.configure(function() {
	app.use(express.static(__dirname));
});

app.get('/section', function(req, res, next) {
	var sectionFile = req.query.name + '.html';
	fs.readFile(sectionFile, { encoding: 'utf8' }, function(err, data) {
		if(err) next(err);
		if(data) {
			res.send(data);
		} else {
			next({
				Error: 'No section file found'
			});
		}
	});
});

app.get('/sectionData', function(req, res, next) {
	var sectionDataFile = 'data/' + req.query.name + '.json';
	fs.readFile(sectionDataFile, { encoding: 'utf8' }, function(err, data) {
		if(err) next(err);
		if(data) {
			res.set('Content-Type', 'application/json');
			res.send(data);
		} else {
			next({
				Error: 'No section data file found'
			});
		}
	});
});

app.get('/availableItems', function(req, res, next) {
	var availableItemsFile = 'data/availableItems.json';
	fs.readFile(availableItemsFile, { encoding: 'utf8' }, function(err, data) {
		if(err) next(err);
		if(data) {
			res.set('Content-Type', 'application/json');
			res.send(data);
		} else {
			next({
				Error: 'No available items data found'
			});
		}
	});
});

app.listen(80);
console.log('Server started on port 80');
console.log('Press Ctrl+C to exit');
