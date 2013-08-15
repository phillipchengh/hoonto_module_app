var express = require('express');
var app = express();

var pg = require('pg');
//var pg_url = process.env.DATABASE_URL || "postgres://phillip:a1xie4rC@localhost:5432/node_hello_world_db";

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

app.get('/query', function(req, res) {
	var client = new pg.Client({
		user: "phillip",
		password: "a1xie4rC",
		database: "node_hello_world_db",
		host: "localhost",
		port: 5432
	});
	client.connect();
	var query_text = 'SELECT * FROM mods_list'
	var query = client.query(query_text);
	query.on('row', function(row, result) {
		result.addRow(row);
	});
	query.on('error', function() {
		console.error("Query error");
	});
	//client.end.bind(client)
	query.on('end', function(result) {
		res.send(result.rows);
		client.end();
	});
});

app.post('/query', function(req, res) {
	var client = new pg.Client({
		user: "phillip",
		password: "a1xie4rC",
		database: "node_hello_world_db",
		host: "localhost",
		port: 5432
	});
	client.connect();
	console.log(req.query);
	var query_text = 'INSERT INTO mods_list(mod_name, mod_desc) VALUES($1, $2)';
		//req.params.mod_name + ', ' + req.params.mod_desc + ')';
	var query = client.query({
		text: query_text,
		values: [req.query.mod_name, req.query.mod_desc]
	});
	var query = client.query(query_text);
	query.on('error', function() {
		console.error("Query error");
	});
	query.on('end', function(result) {
		//res.send(result.rows);
		client.end();
	});
});

app.get('/hello', function(req, res) {
	res.sendfile('hello.html');
});

app.listen(app.get('port'));