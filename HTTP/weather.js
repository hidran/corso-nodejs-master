const https = require('https');

const{WEATHERURL, STATUS_CODE} = require('./constants');
const {processResponse} = require('./functions');

const city = process.argv[2] || '';

try{
const req = https.get(WEATHERURL + city, resp =>{

     switch(resp.statusCode){
         case 200:
             processResponse(resp);
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


