const http = require('http');
const https = require('http');
const url = require('url');
const fs = require('fs');
const WEATHERURL = 'http://api.openweathermap.org/data/2.5/weather?lang=en&appid=b8002a3273b4aef92041398bbb165140&units=metric&q=';
function processWeather(city) {
    return new Promise((resolve, reject) =>{
        console.log(WEATHERURL + city)
        http.get(WEATHERURL + city,
            weather =>{
                let result = '';
                weather.on('data',data=> result += data)
                weather.on('end',()=>{
                   resolve(result)

                });
                weather.on('error' ,(e) => reject(e))
            }
        )
    });
}

https.createServer((req,resp)=>{
    const params = url.parse(req.url,true);
switch (params.pathname) {
    case '/':
        const r = fs.createReadStream('./index.html');
        resp.writeHead(200,{'Content-Type':'text/html'});
        r.pipe(resp);
        break;
    case '/getWeather':
        processWeather(params.query.city).then(data=>{
            resp.writeHead(200,{'Content-Type':'application/json'});
            resp.end(data.trim())
        }).catch( error=>{
            resp.writeHead(400,'No City found ' + error.toString());
    })
        break;
    default:
        resp.writeHead(404);
        resp.end(params.pathname)


}
//resp.writeHead(200,{'Content-Type':'application/json'});
//resp.end(JSON.stringify(params.pathname.trimStart('/')))
}).listen(2000);
console.log('listening on port 2000')
