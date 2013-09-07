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
		database: "mod_db",
		host: "localhost",
		port: 5432
	});
	client.connect();
	var query_text = 
	'SELECT name, description, version, downloads, extract(\'epoch\' FROM add_timestamp) AS add_date, extract(\'epoch\' FROM mod_timestamp) AS mod_date FROM mods_list ORDER BY downloads DESC LIMIT 5 OFFSET $1';
	var query = client.query({
		text: query_text,
		values: [req.query.mod_offset]
	});
	console.log(query);
	query.on('row', function(row, result) {
		var add_date = new Date(row.add_date*1000);
		var month = add_date.getMonth() + 1;
		row.add_date =
		month + '-' + add_date.getDate() + '-' + add_date.getFullYear() + ' ' + add_date.getHours() + ':' + add_date.getMinutes();
		var mod_date = new Date(row.mod_date*1000);
		var month = mod_date.getMonth() + 1;
		row.mod_date =
		month + '-' + mod_date.getDate() + '-' + mod_date.getFullYear() + ' ' + mod_date.getHours() + ':' + mod_date.getMinutes();
		result.addRow(row);
	});
	query.on('error', function() {
		console.error("Query error");
	});
	//client.end.bind(client)
	query.on('end', function(result) {
		console.log(result.rows);
		res.send(result.rows);
		client.end();
	});
});

app.post('/query', function(req, res) {
	var client = new pg.Client({
		user: "phillip",
		password: "a1xie4rC",
		database: "mod_db",
		host: "localhost",
		port: 5432
	});
	client.connect();
	//console.log(req.query);
	var query_text = 
	//'INSERT INTO mods_list(name, description) VALUES($1, $2) RETURNING mod_name, mod_desc';
	'INSERT INTO mods_list(name, description) VALUES($1, $2)';
	var query = client.query({
		text: query_text,
		values: [req.query.mod_name, req.query.mod_desc]
	});
	query.on('row', function(row, result) {
		result.addRow(row);
	});
	query.on('error', function(error) {
		console.error("Query error");
		console.error(error);
		res.send(500, {error: 'Request caused explosion.'});
	});
	query.on('end', function(result) {
		var query_text2 = 
		'SELECT name, description FROM mods_list WHERE name = $1';
		var query2 = client.query({
			text: query_text2,
			values: [req.query.mod_name]
		});
		query2.on('row', function(row2, result2) {
			result2.addRow(row2);
		});
		query2.on('error', function() {
			console.error("Callback query error");
		});
		query2.on('end', function(result2) {
			res.send(result2.rows);
			client.end();
		});
		//res.send(result.rows);
	});
});

app.get('/hello', function(req, res) {
	res.sendfile('hello.html');
});

app.listen(app.get('port'));