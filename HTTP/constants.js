const APPID = 'b8002a3273b4aef92041398bbb165140';
const WEATHERURL = 'https://api.openweathermap.org/data/2.5/weather?appid='
    + APPID + '&units=metric&q=';
const STATUS_CODE = require('http').STATUS_CODES;
module.exports = {
    APPID,
    WEATHERURL,
    STATUS_CODE
};
