var express = require('express'),
	winston = require('winston'),
	fs = require('fs');

var app = express();

// Winston configuration
winston.add(winston.transports.File, { filename: 'debug-exceptions.log' });
winston.handleExceptions(new winston.transports.File({ filename: 'exceptions.log' }));

app.configure(function() {
	var oneDay = 86400000;
	app.use(express.compress());
	app.use(express.static(__dirname), { maxAge: oneDay });
});

app.get('/section', function(req, res, next) {
	var sectionFile = req.query.name + '.html';
	fs.readFile(sectionFile, { encoding: 'utf8' }, function(err, data) {
		if(err) next(err);
		if(data) {
			res.send(data);
		} else {
			next(new Error('No section file found'));
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
			next(new Error('No section data file found'));
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
			next(new Error('No available items data found'));
		}
	});
});

app.use(function(err, req, res, next){
	winston.error('Exception happended!', err);
});

app.listen(80);
winston.info('Server started on port 80');
winston.info('Press Ctrl+C to exit');
