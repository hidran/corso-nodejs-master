const http = require('http');
const resp = http.get('http://localhost:2000', resp=>{
   resp.pipe(process.stdout);
});
resp.on('error', res=> console.log(res.message))
