const http = require('http');
const url = require('url');
const fs = require('fs');
const axios = require('axios');
const {WEATHER_API} =  require('./constants');

http.createServer((req, resp) =>{
    const {pathname, query} = url.parse(req.url, true);

     switch (pathname) {
         case '/':
          const index = fs.createReadStream('./index.html');
             resp.writeHead(200,{'Conten-Type' : 'text/html'});
             index.pipe(resp);
             break;
         case '/getWeather':
             console.log('getWeatherapi')
             const params = {};
             if(query.city && !query.zip ){
                 params.q = query.city;
             }
             if(query.zip){
                 params.zip = query.zip + ',IT';
             }
             if(query.lang){
                 params.lang = query.lang;
             }
             console.log(params);
             axios.get(WEATHER_API,{
                  params

             } ).then(weather =>{
                 resp.writeHead(200,{'Content-Type' : 'application/json'});
                resp.end(JSON.stringify(weather.data));

             })
                 .catch( error =>{
                     console.log(error.toString())
                     resp.writeHead(500);
                     resp.end(error.response.data.message);
                 })
             break;
         default:
             resp.writeHead(400);
             resp.end('BAD REQUEST');
     }

  //  resp.end('You called me with ' + req.url)

}).listen(2000);
console.log('Listening');


