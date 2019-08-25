const request = require('request');
request('http://localhost:2000/getWeather?city=TORINO,IT', (err, response, body) =>{
  console.log(body);

});
