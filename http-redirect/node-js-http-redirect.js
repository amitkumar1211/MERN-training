var http = require('http');
var fs = require('fs');
 
// create a http server
http.createServer(function (req, res) {
     
    if (req.url == '/page-b.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>User has been created successfully.</p></body></html>');
        return res.end();
	}
	
	if (req.url == '/page-c.html') {
        // redirect to page-b.html with 301 (Moved Permanently) HTTP code in the response
        res.writeHead(301, { "Location": "http://" + req.headers['host'] + '/page-b.html' });
        res.end();
    } else {
        // for other URLs, try responding with the page
        console.log(req.url)
        // read requested file
        fs.readFile(req.url.substring(1),
            function(err, data) {       
                if (err) throw err;
                res.writeHead(200);
                res.write(data.toString('utf8'));
                return res.end();
        });
    } 
}).listen(8085);