var express = require('express');
var app = express();

app.configure(function() {
	app.set('port', 1337);
	app.set('views', __dirname + '/views');
	app.use(express.logger());
	app.use(express.static(__dirname ));//+ '/bower_components'));
	//app.set('view engine', 'html');
});

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

app.post('/', function(req, res) {
	console.log(JSON.stringify(req.body));
});

app.get('/hello', function(req, res) {
	res.sendfile('hello.html');
});

app.listen(app.get('port'));