var express = require('express');
var app = express();

app.configure(function() {
	app.set('port', 1337);
	app.set('views', __dirname + '/views');
	app.use(express.logger());
	//app.set('view engine', 'html');
});

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

app.get('/hello', function(req, res) {
	res.sendfile('hello.html');
});

app.listen(app.get('port'));