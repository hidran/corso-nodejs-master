const APPID = 'b8002a3273b4aef92041398bbb165140';
const WEATHERURL = 'https://api.openweathermap.org/data/2.5/weather?lang=it&appid='
    + APPID + '&units=metric&q=';
WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather?lang=it&appid='
    + APPID + '&units=metric';

const STATUS_CODE = require('http').STATUS_CODES;
module.exports = {
    WEATHER_API,
    WEATHERURL,
    STATUS_CODE
};
