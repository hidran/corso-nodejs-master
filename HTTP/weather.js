const request = require('request');

const{WEATHERURL, STATUS_CODE} = require('./constants');
const {processResponse} = require('./functions');

const city = process.argv[2] || '';

try{
const req = request(WEATHERURL + city, (error,resp, body) => {
    if(error){
        console.log(error.toString());
        return;
    }
     switch(resp.statusCode){
         case 200:
             const weatherObj = JSON.parse(body);
             const descr = weatherObj.weather[0].description;
             const minTemp = weatherObj.main.temp_min;
             const maxTemp = weatherObj.main.temp_max;
             output = 'Il tempo oggi è: ' + descr;
             output += '.Temperature tra ' + minTemp + ' e ' + maxTemp;
             console.log(output);
             break;
         case 401:
             console.log('Please, verify your APP ID');
             break;
         case 404:
             console.log('City not found');
             break;
         default:
             console.log( resp.statusCode +':' +STATUS_CODE[resp.statusCode]);
     }


});
}catch (e) {
    console.error(e.message)
}


