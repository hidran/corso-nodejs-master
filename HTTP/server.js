const http = require('http');
const url = require('url');

http.createServer((req, resp) =>{
    const {pathname, query} = url.parse(req.url, true);
   console.log(pathname);
    resp.end('You called me with ' + req.url)

}).listen(2000);
console.log('Listening');


