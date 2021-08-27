var http = require('http'); // Import Node.js core module
var server = http.createServer(function (req, res) {   //create web server
    if (req.url == '/') { //check the URL of the current request
        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
		
        // set response content    
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
    
    }
    else if (req.url == "/createUser") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>User has been created successfully.</p></body></html>');
        res.end();
	}
	else if (req.url == "/updateUser") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>User has been updated successfully.</p></body></html>');
        res.end();
	}
	else if (req.url == "/deleteUser") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>User has been deleted successfully.</p></body></html>');
        res.end();
	}
	else if (req.url == "/getUsers") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>Users.</p></body></html>');
        res.end();
	}
    else if (req.url == "/createCourse") {
		res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>Course has been created successfully.</p></body></html>');
        res.end();
	}
	else if (req.url == "/updateCourse") {
		res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>Course has been updated successfully.</p></body></html>');
        res.end();
	}
	else if (req.url == "/deleteCourse") {
		res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>Course has been deleted successfully.</p></body></html>');
        res.end();
	}
	else if (req.url == "/assignCourse") {
		res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>Course has been assigned successfully.</p></body></html>');
        res.end();
	}
	else if (req.url == "/updateProgress") {
		res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>User has filled the progress successfully.</p></body></html>');
        res.end();
	}
    else
        res.end('Invalid Request!');
});
server.listen(5000); //6 - listen for any incoming requests
console.log('Node.js web server at port 5000 is running..')
