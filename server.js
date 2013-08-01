var http = require('http');

var server = http.createServer();

function handle_request(req, res) {
	res.writeHead(200, {'content-type': 'text/plain'});
	res.write('Hello World!');
	res.end();
}

server.on('request', handle_request);
server.listen(8080);